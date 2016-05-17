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
    plugin_list = list(PLUGIN_MANAGER.plugins.keys())
    return jsonify({"names": plugin_list})


@v1.route('/<plugin_name>/workflows', methods=['GET'])
def api_workflows(plugin_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    workflows_dict = {}
    for key, value in plugin.workflows.items():
        workflows_dict[key] = {}
        workflows_dict[key]['info'] = "Produces: {}".format(
            list(value.signature.output_artifacts.values())
        )
    return jsonify({"workflows": workflows_dict})
