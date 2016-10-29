# ----------------------------------------------------------------------------
# Copyright (c) 2016--, QIIME development team.
#
# Distributed under the terms of the Modified BSD License.
#
# The full license is in the file LICENSE, distributed with this software.
# ----------------------------------------------------------------------------

from flask import Blueprint, jsonify, request
import qiime.sdk

types = Blueprint('types', __name__)

PLUGIN_MANAGER = qiime.sdk.PluginManager()


@types.route('/subtype', methods=['POST'])
def is_subtype():
    request_body = request.get_json()
    list_a = list(map(qiime.sdk.parse_type, request_body['a']))
    list_b = list(map(qiime.sdk.parse_type, request_body['b']))

    yes = {}
    no = {}
    for b in list_b:
        yes[repr(b)] = yays = []
        no[repr(b)] = nays = []
        for a in list_a:
            if a <= b:
                yays.append(repr(a))
            else:
                nays.append(repr(a))
    return jsonify({'yes': yes, 'no': no})
