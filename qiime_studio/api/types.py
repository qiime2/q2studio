from flask import Blueprint, jsonify, request
import qiime.sdk

types = Blueprint('types', __name__)

PLUGIN_MANAGER = PluginManager()


@types.route('/subtype', methods=['POST'])
def is_subtype():
    request_body = request.get_json()
    list_a = list(map(qiime.sdk.parse_type, request_body['a']))
    list_b = list(map(qiime.sdk.parse_type, request_body['b']))

    results = {}
    for b in list_b:
        results[repr(b)] = subtypes = []
        for a in list_a:
            if a <= b:
                subtypes.append(repr(a))
    return jsonify({'supertypes': results})
