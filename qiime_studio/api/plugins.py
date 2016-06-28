from flask import Blueprint, jsonify, request

from qiime.sdk import PluginManager

PLUGIN_MANAGER = PluginManager()
plugins = Blueprint('plugins', __name__)


@plugins.route('/', methods=['GET'])
def get_plugins():
    pass


@plugins.route('/<plugin_name>', methods=['GET'])
def inspect_plugin(plugin_name):
    pass


@plugins.route('/<plugin_name>/methods', methods=['GET'])
def get_plugin_methods(plugin_name):
    pass


@plugins.route('/<plugin_name>/methods/<method_name>', methods=['GET'])
def inspect_plugin_method(plugin_name, method_name):
    pass


@plugins.route('/<plugin_name>/visualizers', methods=['GET'])
def get_plugin_visualizers(plugin_name):
    pass


@plugins.route('/<plugin_name>/visualizers/<method_name>', methods=['GET'])
def inspect_plugin_visualizer(plugin_name, method_name):
    pass
