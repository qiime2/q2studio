import datetime
import glob
import os

from flask import Blueprint, jsonify, request

from .security import validate_request_authentication
from qiime.sdk import PluginManager, Artifact, SubprocessExecutor

PLUGIN_MANAGER = PluginManager()
SUBPROCESS_EXECUTOR = SubprocessExecutor()

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
        {'name': name, 'workflow_uri': 'plugins/%s/workflows' % name}
        for name in PLUGIN_MANAGER.plugins
    ]

    return jsonify({'plugins': plugins_dict})


@v1.route('/plugins/<plugin_name>/workflows', methods=['GET'])
def api_workflows(plugin_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    workflows_dict = {}
    for key, value in plugin.workflows.items():
        workflows_dict[key] = {}
        workflows_dict[key]['name'] = key
        workflows_dict[key]['info'] = "Produces: {}".format(
            ", ".join([
                repr(type_[0])
                for type_ in value.signature.outputs.values()
            ])
        )
        workflows_dict[key]['description'] = value.signature.name
        workflows_dict[key]['requires'] = []
        workflows_dict[key]['inputArtifacts'] = [
            {
                'name': name,
                'type': repr(type_[0]),
                'uri': 'artifacts/%s/%s/%s' % (plugin_name, key, name)
            }
            for name, type_ in value.signature.inputs.items()
        ]
        workflows_dict[key]['inputParameters'] = [
            {'name': name, 'type': repr(type_[0])}
            for name, type_ in value.signature.parameters.items()
        ]
        workflows_dict[key]['outputArtifacts'] = [
            {'name': name, 'type': repr(type_[0])}
            for name, type_ in value.signature.outputs.items()
        ]
        workflows_dict[key]['jobUri'] = \
            'job/%s/%s' % (plugin_name, key)
    return jsonify({'workflows': workflows_dict})


@v1.route('/artifacts', methods=['GET'])
def api_artifacts():
    path = request.args.get('path', os.getcwd())
    artifact_paths = glob.glob(os.path.join(path, '*.qzf'))
    artifacts = [
        {
            'name': os.path.splitext(os.path.split(path)[1])[0],
            'uuid': str(Artifact.load(path).uuid),
            'type': str(Artifact.load(path).type),
            'path': path,
            'uri': 'artifacts/%s' % (os.path.splitext(
                                        os.path.split(path)[1])[0])
        }
        for path in artifact_paths
    ]
    return jsonify({'artifacts': artifacts})


@v1.route('/artifacts/<name>', methods=['DELETE'])
def delete_artifact(name):
    result = {'success': True}
    artifact_json = request.get_json()['artifact']
    artifact = Artifact.load(artifact_json['path'])
    if str(artifact.uuid) == artifact_json['uuid']:
        try:
            os.remove(artifact_json['path'])
        except OSError:
            result['success'] = False

    return jsonify(result)


@v1.route('/artifacts/<plugin_name>/<workflow_name>/<input_name>',
          methods=['GET'])
def api_input_artifacts(plugin_name, workflow_name, input_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    workflow = plugin.workflows[workflow_name]
    input_type = workflow.signature.inputs[input_name][0]
    input_artifacts = []
    path = request.args.get('path', os.getcwd())
    artifact_paths = glob.glob(os.path.join(path, '*.qzf'))
    artifacts = [
        {
            'name': os.path.splitext(os.path.split(path)[1])[0],
            'uuid': str(Artifact.load(path).uuid),
            'type': str(Artifact.load(path).type),
            'path': path,
            'uri': 'artifacts/%s' % (os.path.splitext(
                                        os.path.split(path)[1])[0])
        }
        for path in artifact_paths
    ]
    for artifact in artifacts:
        if Artifact.load(artifact['path']).type <= input_type:
            input_artifacts.append(artifact)
    return jsonify({'input_artifacts': input_artifacts})


@v1.route('/job/<plugin_name>/<workflow_name>', methods=['POST'])
def execute_workflow(plugin_name, workflow_name):
    path = request.args.get('path', os.getcwd())
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    workflow = plugin.workflows[workflow_name]

    request_body = request.get_json()

    inputs = {name: None
              for name in workflow.signature.inputs}
    parameters = {name: None
                  for name in workflow.signature.parameters}
    outputs = {name: None
               for name in workflow.signature.outputs}

    for key, value in request_body['jobData'].items():
        if '-' in key:
            type_, name = key.split('-')
            if type_ == 'in':
                inputs[name] = value
            elif type_ == 'param':
                parameters[name] = value
            elif type_ == 'out':
                if not value.endswith('.qzf'):
                    value += '.qzf'
                outputs[name] = os.path.join(path, value)

    def toggle_completion(future_result, job):
        job_id = str(job.uuid)
        completed_future = future_result.result()
        __JOBS[job_id]['error'] = completed_future.returncode is not 0
        __JOBS[job_id]['stderr'] = completed_future.stderr.decode('utf-8')
        __JOBS[job_id]['stdout'] = completed_future.stdout.decode('utf-8')
        __JOBS[job_id]['completed'] = True
        __JOBS[job_id]['finished'] = '{:%Y-%b-%d %H:%M:%S}' \
                                     .format(datetime.datetime.now())

    now = '{:%Y-%b-%d %H:%M:%S}'.format(datetime.datetime.now())
    future_result, job = SUBPROCESS_EXECUTOR(workflow,
                                             inputs,
                                             parameters,
                                             outputs)
    __JOBS[str(job.uuid)] = {
        'completed': False,
        'error': False,
        'finished': None,
        'started': now
    }
    future_result.add_done_callback(lambda future_result:
                                    toggle_completion(future_result, job))

    success = future_result.running() or future_result.done()
    result = {
        'success': success,
        'job': {
            'code': job.code,
            'workflow': workflow_name,
            'uuid': job.uuid,
            'inputs': job.input_artifact_filepaths,
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
