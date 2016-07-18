# ----------------------------------------------------------------------------
# Copyright (c) 2016--, QIIME development team.
#
# Distributed under the terms of the Modified BSD License.
#
# The full license is in the file LICENSE, distributed with this software.
# ----------------------------------------------------------------------------

import collections
import io
import sys
import tempfile
import threading
import traceback
import uuid
import time

from flask import Blueprint, jsonify, request, abort, url_for
import qiime
import qiime.sdk
import qiime.plugin

from qiime_studio.util import redirected_stdio
from .workspace import load_artifacts

jobs = Blueprint('jobs', __name__)

# TODO: JOBS should go in a sqlite database in the event our WSGI server
# decides to create more than one process
JOBS = {}
PLUGIN_MANAGER = qiime.sdk.PluginManager()


@jobs.route('/', methods=['GET'])
def get_jobs():
    return jsonify({
        'jobs': [
            {
                'job_id': key,
                'status': value.status,
                'started': value.started,
                'finished': value.finished
            } for key, value in JOBS.items()
        ]
    })


LOCK = threading.Lock()


@jobs.route('/', methods=['POST'])
def create_job():
    # TODO: handle errors in the request body
    request_body = request.get_json()
    plugin = request_body['plugin']
    action = request_body['action']
    action_type = request_body['actionType']
    inputs = request_body['inputs']
    parameters = request_body['parameters']
    outputs_ = request_body['outputs']

    plugin = PLUGIN_MANAGER.plugins[plugin]
    action = getattr(plugin, action_type)[action]

    outputs = collections.OrderedDict()
    for key, value in action.signature.outputs.items():
        path = outputs_[key]
        if action_type.startswith('method'):
            if not path.endswith('.qza'):
                path += '.qza'
        else:
            if not path.endswith('.qzv'):
                path += '.qzv'

        outputs[key] = path
    try:
        # TODO: make this better
        json_params = {}
        for key, (type_, _) in action.signature.parameters.items():
            if type_ == qiime.plugin.Metadata:
                parameters[key] = qiime.Metadata.load(parameters[key])
                json_params[key] = '<metadata>'
            elif type_ == qiime.plugin.MetadataCategory:
                parameters[key] = qiime.Metadata.load(
                    parameters[key][0]).get_category(parameters[key][1])
                json_params[key] = '<metadata>'
            else:
                json_params[key] = parameters[key]

        parameters = action.signature.decode_parameters(**parameters)
        inputs = load_artifacts(**inputs)
    except Exception as e:
        r = jsonify({'error': str(e)})
        r.status_code = 400
        return r

    job_id = str(uuid.uuid4())
    now = int(time.time() * 1000)

    JOBS[job_id] = {
        'uuid': job_id,
        'completed': False,
        'error': False,
        'started': now,
        'finished': None,
        'stdout': None,
        'stderr': None,
        'code': action.source,
        'actionId': action.id,
        'actionName': action.name,
        'inputs': {k: v.uuid for k, v in inputs.items()},
        'params': json_params,
        'outputs': {k: None for k in outputs}
    }

    inputs.update(parameters)

    # Add prefix just in case the file isn't unlinked, but we don't need a name
    # either way as the context manager works on file-descripters
    stdout = tempfile.TemporaryFile(prefix='qiime-studio-stdout')
    stderr = tempfile.TemporaryFile(prefix='qiime-studio-stderr')
    with LOCK:  # Lock to avoid fd: 1, 2, from being reassigned concurrently.
        with redirected_stdio(to=stdout, stdio=sys.stdout):
            with redirected_stdio(to=stderr, stdio=sys.stderr):
                future = action.async(**inputs)
                future.add_done_callback(
                    _callback_factory(job_id, outputs, stdout, stderr))

    return jsonify({
        'job': url_for('.inspect_job', job_id=job_id)
    })


def _callback_factory(job_id, outputs, stdout_fh, stderr_fh):
    # This is needed for closure over stdout, stderr, outputs
    def callback(future):
        now = int(time.time() * 1000)
        try:
            results = future.result()
            if type(results) is not tuple:
                results = (results,)
        except Exception:
            results = None
            fh = io.TextIOWrapper(stderr_fh)
            traceback.print_exc(file=fh)
            fh.flush()
        stdout = _consume_fh(stdout_fh)
        stderr = _consume_fh(stderr_fh)

        job = JOBS[job_id]

        if results is not None:
            for result, path in zip(results, outputs.values()):
                result.save(path)
            job['outputs'] = {k: v.uuid for k, v in zip(outputs, results)}

        job['completed'] = True
        job['error'] = results is None
        job['stdout'] = stdout.decode('utf8')
        job['stderr'] = stderr.decode('utf8')
        job['finished'] = now

    return callback


def _consume_fh(fh):
    fh.seek(0)
    r = fh.read()
    fh.close()
    return r


@jobs.route('/<job_id>', methods=['GET'])
def inspect_job(job_id):
    try:
        return jsonify(JOBS[job_id])
    except KeyError:
        abort(404)
    return ''


@jobs.route('/<job_id>', methods=['DELETE'])
def delete_job(job_id):
    try:
        del JOBS[job_id]
    except KeyError:
        # This could trigger a reload of the jobs in the interface
        abort(404)
    return ''
