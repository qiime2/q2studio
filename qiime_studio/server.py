import os
import sys
import base64

from flask import Flask
from gevent.pywsgi import WSGIServer

from qiime_studio.api import jobs, plugins, types, workspace
from qiime_studio.security import validate_request_authentication
from qiime_studio.headers import add_cors_headers

studio = Flask('qiime_studio')
studio.register_blueprint(jobs, url_prefix='/api/jobs/')
studio.register_blueprint(plugins, url_prefix='/api/plugins/')
studio.register_blueprint(types, url_prefix='/api/types/')
studio.register_blueprint(workspace, url_prefix='/api/workspace/')

studio.before_request(validate_request_authentication)
studio.after_request(add_cors_headers)


def start_server():
    studio.debug = True
    # setup secret key
    studio.config['SECRET_KEY'] = secret_key = os.urandom(33)
    secret_key = base64.b64encode(secret_key).decode('ascii')
    # setup OS-assigned port
    server = WSGIServer(('localhost', 0), studio)
    server.start()
    # send key and port to parent process
    sys.stdout.write("%d %s" % (server.server_port, secret_key))
    sys.stdout.flush()  # (needed when output is in a pipe)
    # never stop not stopping
    server.serve_forever()
