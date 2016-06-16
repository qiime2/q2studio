import os
import sys
import base64

from flask import Flask, jsonify
from gevent.pywsgi import WSGIServer

from qiime_studio.api.cors import add_cors_headers
from qiime_studio.api.v1 import v1

studio = Flask('qiime_studio')
studio.register_blueprint(v1, url_prefix='/api/0.0.1')
studio.after_request(add_cors_headers)


# No output is visible, as for some reason it is held back
# by the server flushed at seemingly random intervals
# also, what should be the stdout, is being sent through stderr??
def flush_stdio():
    sys.stdout.flush()
    sys.stderr.flush()


@studio.route("/api/", methods=['GET'])
def available_api():
    return jsonify(available=["/api/0.0.1/"])


@studio.route("/", methods=['GET'])
def hello():
    return "Hello World!"


def start_server():
    studio.debug = True
    studio.before_request(flush_stdio)

    studio.config['SECRET_KEY'] = secret_key = os.urandom(33)
    secret_key = base64.b64encode(secret_key).decode('ascii')

    server = WSGIServer(('localhost', 0), studio)
    server.start()
    sys.stdout.write("%d %s" % (server.server_port, secret_key))
    sys.stdout.flush()  # Needed when piping output.
    server.serve_forever()
