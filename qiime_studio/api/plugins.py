from flask import Blueprint, jsonify, request, url_for

from qiime.sdk import PluginManager

PLUGIN_MANAGER = PluginManager()
plugins = Blueprint('plugins', __name__)


@plugins.route('/', methods=['GET'])
def get_plugins():
    plugins_dict = [
        {'name': name,
         'method_uri': url_for('.get_plugin_methods', plugin_name=name)}
        for name in PLUGIN_MANAGER.plugins
    ]

    return jsonify({'plugins': plugins_dict})


@plugins.route('/<plugin_name>', methods=['GET'])
def inspect_plugin(plugin_name):
    pass


@plugins.route('/<plugin_name>/methods', methods=['GET'])
def get_plugin_methods(plugin_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    methods_dict = {}
    for key, value in plugin.methods.items():
        methods_dict[key] = {}
        methods_dict[key]['name'] = key
        methods_dict[key]['info'] = "Produces: {}".format(
            ", ".join([repr(type_[0])
                      for type_ in value.signature.outputs.values()])
        )
        # methods_dict[key]['description'] = value.signature.name
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


@plugins.route('/<plugin_name>/methods/<method_name>', methods=['GET'])
def inspect_plugin_method(plugin_name, method_name):
    pass


@plugins.route('/<plugin_name>/visualizers', methods=['GET'])
def get_plugin_visualizers(plugin_name):
    pass


@plugins.route('/<plugin_name>/visualizers/<method_name>', methods=['GET'])
def inspect_plugin_visualizer(plugin_name, method_name):
    pass
