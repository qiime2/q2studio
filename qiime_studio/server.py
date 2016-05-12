import webbrowser

from flask import Flask, jsonify
from gevent.pywsgi import WSGIServer

from qiime_studio.api.security import make_url
from qiime_studio.api.cors import add_cors_headers
from qiime_studio.api.v1 import v1
from qiime_studio.static import static_files

studio = Flask('qiime_studio')
studio.register_blueprint(v1, url_prefix='/api/0.0.1')
studio.debug = True

studio.after_request(add_cors_headers)


@studio.route("/api/", methods=['GET'])
def available_api():
    return jsonify(available=["/api/0.0.1/"])


@studio.route("/", methods=['GET'])
def hello():
    return "Hello World!"


def start_server(port, domain, in_dev, run_local, skip_open):
    host = "%s:%d/api/" % (domain, port)
    ihost = "qiime.studio/"
    if run_local:
        ihost = "%s:%d" % (domain, port)
        studio.register_blueprint(static_files)
    elif in_dev:
        ihost = "localhost:4242"

    url = make_url(host, ihost)

    print("Your QIIME Studio server is starting.")
    print("Please visit the following URL to access:\n")
    print(url)
    if not skip_open:
        webbrowser.open(url)
    WSGIServer((domain, port), studio).serve_forever()
