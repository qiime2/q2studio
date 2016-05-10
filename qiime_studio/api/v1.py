from flask import Blueprint, jsonify

from .security import validate_request_authentication
from .cors import add_cors_headers
from qiime.sdk import PluginManager

v1 = Blueprint('v1', __name__)
v1.before_request(validate_request_authentication)
v1.after_request(add_cors_headers)


@v1.route('/')
def root():
    return jsonify(content="!")

@v1.route('/plugins', methods=['GET'])
def plugins():
    pm = PluginManager()
    return jsonify(pm.plugins)
