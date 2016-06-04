from flask import Blueprint, jsonify

from .security import validate_request_authentication
from qiime.sdk import PluginManager

PLUGIN_MANAGER = PluginManager()
v1 = Blueprint('v1', __name__)
v1.before_request(validate_request_authentication)


@v1.route('/', methods=['GET', 'POST'])
def root():
    return jsonify(content="!")


@v1.route('/plugins', methods=['GET'])
def api_plugins():
    plugins_dict = {}
    plugins_dict = [
        {'name': name, 'workflow_uri': '%s/workflows' % name}
        for name in PLUGIN_MANAGER.plugins
    ]

    return jsonify({"plugins": plugins_dict})


@v1.route('/<plugin_name>/workflows', methods=['GET'])
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
        workflows_dict[key]['input_artifacts'] = [
            {'name': name, 'type': repr(type_[0])}
            for name, type_ in value.signature.inputs.items()
        ]
        workflows_dict[key]['input_parameters'] = [
            {'name': name, 'type': repr(type_[0])}
            for name, type_ in value.signature.parameters.items()
        ]
        workflows_dict[key]['output_artifacts'] = [
            {'name': name, 'type': repr(type_[0])}
            for name, type_ in value.signature.outputs.items()
        ]
    return jsonify({"workflows": workflows_dict})
