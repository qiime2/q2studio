# ----------------------------------------------------------------------------
# Copyright (c) 2016--, QIIME development team.
#
# Distributed under the terms of the Modified BSD License.
#
# The full license is in the file LICENSE, distributed with this software.
# ----------------------------------------------------------------------------

import collections

from flask import Blueprint, jsonify, url_for
import qiime.sdk

PLUGIN_MANAGER = qiime.sdk.PluginManager()
plugins = Blueprint('plugins', __name__)


@plugins.route('/', methods=['GET'])
def get_plugins():
    plugins = [{
        'name': name,
        'methodsURI': url_for('.get_plugin_methods', plugin_name=name),
        'visualizersURI': url_for('.get_plugin_visualizers', plugin_name=name)
    } for name in PLUGIN_MANAGER.plugins]

    return jsonify({'plugins': plugins})


@plugins.route('/<plugin_name>', methods=['GET'])
def inspect_plugin(plugin_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]

    plugin_dict = {}
    plugin_dict['name'] = plugin.name
    plugin_dict['version'] = plugin.version
    plugin_dict['website'] = plugin.website
    plugin_dict['package'] = plugin.package

    return jsonify({'plugin': plugin_dict})


def _build_data_dict(data):
    dict_ = collections.defaultdict(dict)

    for key, value in data.items():
        dict_[key]['id'] = key
        dict_[key]['name'] = value.name
        dict_[key]['description'] = value.description
        dict_[key]['inputs'] = [
            {'name': name, 'type': repr(type_[0])}
            for name, type_ in value.signature.inputs.items()
        ]
        dict_[key]['parameters'] = [
            {'name': name, 'type': repr(type_[0]), 'ast': type_[0].to_ast()}
            for name, type_ in value.signature.parameters.items()
        ]
        dict_[key]['outputs'] = [
            {'name': name, 'type': repr(type_[0])}
            for name, type_ in value.signature.outputs.items()
        ]

    return dict_


@plugins.route('/<plugin_name>/methods', methods=['GET'])
def get_plugin_methods(plugin_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]

    methods_dict = _build_data_dict(plugin.methods)

    return jsonify({'methods': methods_dict})


def _build_inspect_dict(data):
    dict_ = {}

    dict_['id'] = data.id
    dict_['inputs'] = data.signature.inputs
    dict_['parameters'] = data.signature.parameters
    dict_['outputs'] = data.signature.outputs
    dict_['name'] = data.name
    dict_['description'] = data.description
    dict_['source'] = data.source

    return dict_


@plugins.route('/<plugin_name>/methods/<method_name>', methods=['GET'])
def inspect_plugin_method(plugin_name, method_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    method = plugin.methods[method_name]

    method_dict = _build_inspect_dict(method)

    return jsonify({'method': method_dict})


@plugins.route('/<plugin_name>/visualizers', methods=['GET'])
def get_plugin_visualizers(plugin_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]

    visualizers_dict = _build_data_dict(plugin.visualizers)

    return jsonify({'visualizers': visualizers_dict})


@plugins.route('/<plugin_name>/visualizers/<method_name>', methods=['GET'])
def inspect_plugin_visualizer(plugin_name, method_name):
    plugin = PLUGIN_MANAGER.plugins[plugin_name]
    visualizer = plugin.visualizers[method_name]

    visualizer_dict = _build_inspect_dict(visualizer)

    return jsonify({'method': visualizer_dict})
