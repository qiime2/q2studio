import datetime
import glob
import os
import io
import traceback

from flask import Blueprint, jsonify, request

from .security import validate_request_authentication
from qiime.sdk import Artifact, PluginManager, Visualization

PLUGIN_MANAGER = PluginManager()

__JOBS = {}

v1 = Blueprint('v1', __name__)
v1.before_request(validate_request_authentication)


@v1.route('/', methods=['GET', 'POST'])
def root():
    return jsonify(content='!')


@v1.route('/plugins', methods=['GET'])
def api_plugins():
    plugins_dict = {}
    plugins_dict = [
        {'name': name, 'method_uri': 'plugins/%s/methods' % name}
        for name in PLUGIN_MANAGER.plugins
    ]

    return jsonify({'plugins': plugins_dict})


@v1.route('/plugins/<plugin_name>/methods', methods=['GET'])
def api_methods(plugin_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    methods_dict = {}
    for key, value in plugin.methods.items():
        methods_dict[key] = {}
        methods_dict[key]['name'] = key
        methods_dict[key]['info'] = "Produces: {}".format(
            ", ".join([repr(type_[0])
                      for type_ in value.signature.outputs.values()])
        )
        methods_dict[key]['description'] = value.signature.name
        methods_dict[key]['requires'] = []
        methods_dict[key]['inputArtifacts'] = [{
            'name': name,
            'type': repr(type_[0]),
            'uri': 'artifacts/%s/%s/%s' % (plugin_name, key, name)}
            for name, type_ in value.signature.inputs.items()
        ]
        methods_dict[key]['inputParameters'] = [
            {'name': name, 'type': repr(type_[0])}
            for name, type_ in value.signature.parameters.items()
        ]
        methods_dict[key]['outputArtifacts'] = [
            {'name': name, 'type': repr(type_[0])}
            for name, type_ in value.signature.outputs.items()
        ]
        methods_dict[key]['jobUri'] = 'job/%s/%s' % (plugin_name, key)
    return jsonify({'methods': methods_dict})


@v1.route('/artifacts', methods=['GET'])
def api_artifacts():
    path = request.args.get('path', os.getcwd())
    artifact_paths = glob.glob(os.path.join(path, '*.qza'))
    visualization_paths = glob.glob(os.path.join(path, '*.qzv'))
    artifacts = [artifact_struct(artifact, path)
                 for artifact, path in zip(map(Artifact.load, artifact_paths),
                                           artifact_paths)]
    visualizations = [
        artifact_struct(visualization, path)
        for visualization, path in
        zip(map(Visualization.load, visualization_paths), visualization_paths)]

    return jsonify({'artifacts': artifacts, 'visualizations': visualizations})


@v1.route('/artifacts/<name>', methods=['DELETE'])
def delete_item(name):
    result = {'success': True}
    request_json = request.get_json()
    item_json = request_json['item']
    data_type = request_json['type']
    item = None
    if data_type == 'artifact':
        item = Artifact.load(item_json['path'])
    elif data_type == 'visualization':
        item = Visualization.load(item_json['path'])
    if str(item.uuid) == item_json['uuid']:
        try:
            os.remove(item_json['path'])
        except OSError:
            result['success'] = False

    return jsonify(result)


@v1.route('/artifacts/<plugin_name>/<method_name>/<input_name>',
          methods=['GET'])
def api_input_artifacts(plugin_name, method_name, input_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    method = plugin.methods[method_name]
    input_type = method.signature.inputs[input_name][0]
    input_artifacts = []
    path = request.args.get('path', os.getcwd())
    artifact_paths = glob.glob(os.path.join(path, '*.qza'))
    for artifact, path in zip(map(Artifact.load, artifact_paths),
                              artifact_paths):
        if artifact.type <= input_type:
            input_artifacts.append(artifact_struct(artifact, path))
    return jsonify({'input_artifacts': input_artifacts})


def artifact_struct(artifact, path):
    return {
        'name': os.path.splitext(os.path.split(path)[1])[0],
        'uuid': str(artifact.uuid),
        'type': str(artifact.type),
        'path': path,
        'uri': 'artifacts/%s' % (os.path.splitext(
                                    os.path.split(path)[1])[0])
    }


@v1.route('/job/<plugin_name>/<method_name>', methods=['POST'])
def execute_method(plugin_name, method_name):
    path = request.args.get('path', os.getcwd())
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    method = plugin.methods[method_name]

    request_body = request.get_json()

    inputs = {name: None
              for name in method.signature.inputs}
    parameters = {name: None
                  for name in method.signature.parameters}
    outputs = {name: None
               for name in method.signature.outputs}

    for key, value in request_body['jobData'].items():
        if '-' in key:
            type_, name = key.split('-')
            if type_ == 'in':
                inputs[name] = Artifact.load(value)
            elif type_ == 'param':
                parameters[name] = value
            elif type_ == 'out':
                if not value.endswith('.qza'):
                    value += '.qza'
                outputs[name] = os.path.join(path, value)

    def toggle_completion(future_result, job_id):
        try:
            results = future_result.result()
            exception = None
        except Exception:
            with io.StringIO as fh:
                traceback.print_exc(file=fh)
                exception = fh.getvalue()
        __JOBS[job_id]['error'] = exception is not None
        __JOBS[job_id]['stderr'] = exception
        __JOBS[job_id]['stdout'] = ""
        __JOBS[job_id]['completed'] = True
        __JOBS[job_id]['finished'] = '{:%Y-%b-%d %H:%M:%S}' \
                                     .format(datetime.datetime.now())

    now = '{:%Y-%b-%d %H:%M:%S}'.format(datetime.datetime.now())
    job_id = str(uuid.uuid4())
    future_result = method.async(**inputs)

    __JOBS[job_id] = {
        'completed': False,
        'error': False,
        'finished': None,
        'started': now
    }
    future_result.add_done_callback(lambda future_result:
                                    toggle_completion(future_result, job_id))

    success = future_result.running() or future_result.done()
    result = {
        'success': success,
        'job': {
            'code': method.source,
            'method': method_name,
            'uuid': job_id,
            'inputs': [],
            'params': job.parameter_references,
            'outputs': job.output_artifact_filepaths,
            'started': now
        }
    }

    return jsonify(result)


@v1.route('/jobs', methods=['GET'])
def fetch_job_status():
    return jsonify({
        'completed': [{'uuid': key, 'job': value}
                      for key, value in __JOBS.items()
                      if value['completed'] is True]
    })


@v1.route('/jobs/<job_id>', methods=['DELETE'])
def delete_completed_job(job_id):
    success = True
    try:
        __JOBS.pop(job_id)
    except KeyError:
        success = False
    return jsonify({'result': success})
