import os

from flask import Blueprint, jsonify, request, abort, url_for

workspace = Blueprint('workspace', __name__)

ARTIFACTS = {}
VISUALIZATIONS = {}


def load_artifacts(**kwargs):
    return {k: Artifact.load(ARTIFACTS[v]) for k, v in kwargs.items()}


@workspace.route('/', methods=['GET'])
def get_workspace():
    return jsonify({'workspace': os.getcwd()})


@workspace.route('/', methods=['PUT'])
def change_workspace():
    request_body = request.get_json()
    new_dir = request_body['workspace']
    try:
        os.chdir(new_dir)
        return
    except Exception:
        # TODO: what's a good status code for this?
        abort(500)

def _result_record(result, route):
    return {
        'uuid': result.uuid,
        'type': result.type,
        'uri': url_for(route, result.uuid)
    }


@workspace.route('/artifacts', methods=['GET'])
def get_artifacts():
    global ARTIFACTS
    ARTIFACTS = {}
    path = os.getcwd()
    artifact_paths = list(glob.glob(os.path.join(path, '*.qza')))
    artifacts = []
    for artifact, artifact_path in zip(map(Artifact.load, artifact_paths),
                                       artifact_paths):
        ARTIFACTS[artifact.uuid] = artifact_path
        artifacts.append(_result_record(artifact, '.inspect_artifact'))

    return jsonify({'artifacts': artifacts})


@workspace.route('/artifacts/<uuid>', methods=['GET'])
def inspect_artifact(uuid):
    try:
        artifact = Artifact.load(ARTIFACTS[uuid])
    except Exception:
        abort(404)

    return jsonify({'uuid': artifact.uuid, 'type': artifact.type})


@workspace.route('/artifacts/<uuid>', methods=['DELETE'])
def delete_artifact(uuid):
    try:
        os.remove(ARTIFACTS[uuid])
    except OSError, KeyError:
        abort(404)


@workspace.route('/visualizations', methods=['GET'])
def get_visualizations():
    global VISUALIZATIONS
    VISUALIZATIONS = {}
    path = os.getcwd()
    viz_paths = list(glob.glob(os.path.join(path, '*.qzv')))
    visualizations = []
    for viz, viz_path in zip(map(Visualization.load, viz_paths), viz_paths):
        VISUALIZATIONS[viz.uuid] = viz_path
        visualizations.append(_result_record(viz, '.inspect_visualization'))

    return jsonify({'visualizations': visualizations})


@workspace.route('/visualizations/<uuid>', methods=['GET'])
def inspect_visualization(uuid):
    try:
        visualization = Visualization.load(VISUALIZATIONS[uuid])
    except Exception:
        abort(404)

    return jsonify({'uuid': visualization.uuid, 'type': visualization.type})

@workspace.route('/visualizations/<uuid>', methods=['DELETE'])
def delete_visualization(uuid):
    try:
        os.remove(VISUALIZATIONS[uuid])
    except OSError, KeyError:
        abort(404)
