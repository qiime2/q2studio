from flask import Blueprint, jsonify, request

workspace = Blueprint('workspace', __name__)


@workspace.route('/', methods=['GET'])
def get_workspace():
    pass


@workspace.route('/', methods=['PUT'])
def change_workspace():
    pass


@workspace.route('/artifacts', methods=['GET'])
def get_artifacts():
    # path = request.args.get('path', os.getcwd())
    # artifact_paths = glob.glob(os.path.join(path, '*.qza'))
    # artifacts = [artifact_struct(artifact, path)
    #              for artifact, path in zip(map(Artifact.load, artifact_paths),
    #                                        artifact_paths)]
    # return jsonify({'artifacts': artifacts})
    pass


@workspace.route('/artifacts/<name>', methods=['GET'])
def inspect_artifact(name):
    pass


@workspace.route('/artifacts/<name>', methods=['DELETE'])
def delete_artifact(name):
    # result = {'success': True}
    # artifact_json = request.get_json()['artifact']
    # artifact = Artifact.load(artifact_json['path'])
    # if str(artifact.uuid) == artifact_json['uuid']:
    #     try:
    #         os.remove(artifact_json['path'])
    #     except OSError:
    #         result['success'] = False
    #
    # return jsonify(result)
    pass

@workspace.route('/visualizations', methods=['GET'])
def get_visualizations():
    pass


@workspace.route('/visualizations/<name>', methods=['GET'])
def inspect_visualization(name):
    pass

@workspace.route('/visualizations/<name>', methods=['DELETE'])
def delete_visualization(name):
    pass
