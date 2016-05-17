import hmac
import base64
import os
import urllib
import collections
from time import time

from flask import request, abort

__KEY = os.urandom(33)
__WHITE_LIST = ["GET", "OPTIONS"]


def validate_request_authentication():
    if (request.method not in __WHITE_LIST):
        request_date = int(request.headers.get('Request-Date'))
        auth, signature = request.headers.get('Authorization').split()
        message = [
                    request.method,
                    request.headers.get('Origin'),
                    request.headers.get('Request-Date'),
                    request.headers.get('Content-Type'),
                    request.headers.get('Content-Length')
                  ]
        for i in range(len(message)):
            message[i] = str(message[i]).encode('utf8')
        if (
            signature.encode('utf8') != make_b64_digest(message) or
            time() - (request_date / 1000) > 60
        ):
            abort(403)


def make_url(host, ihost):
    args = collections.OrderedDict([
        ('type', 'ESTABLISH_CONNECTION'),
        ('uri', host),
        # ('auth', 'HMAC-sha256'),
        # ('public_key', 'self'),
        ('secret_key', base64.b64encode(__KEY).decode('ascii'))
        # 'digest_members': "VERB,URL,Date,Content-Type,Content-Length,BODY"
    ])
    return "http://%s/#%s" % (ihost, urllib.parse.urlencode(args))


def make_b64_digest(content):
    hmac_generator = hmac.new(__KEY,
                              digestmod="sha256")
    for value in content:
        hmac_generator.update(value)
    digest = hmac_generator.digest()
    return base64.b64encode(digest)
