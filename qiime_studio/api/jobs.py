import collections

from flask import Blueprint, jsonify, request

jobs = Blueprint('jobs', __name__)

__JOBS = {}

@jobs.route('/', methods=['GET'])
def get_jobs():
    return jsonify({
        'completed': [],
        'active': [],
        'failed': []
    })

    # return jsonify({
    #     'completed': [{'uuid': key, 'job': value}
    #                   for key, value in __JOBS.items()
    #                   if value['completed'] is True]
    # })
    pass


@jobs.route('/', methods=['POST'])
def create_job():
    pass


@jobs.route('/<job_id>', methods=['GET'])
def inspect_job(job_id):
    pass


@jobs.route('/<job_id>', methods=['DELETE'])
def delete_job(job_id):
    # success = True
    # try:
    #     __JOBS.pop(job_id)
    # except KeyError:
    #     success = False
    # return jsonify({'result': success})
    pass
