from flask import Blueprint, jsonify, request

types = Blueprint('types', __name__)


@types.route('/subtype', methods=['POST'])
def is_subtype():
    pass
