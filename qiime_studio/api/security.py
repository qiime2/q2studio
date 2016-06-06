import hmac
import base64
import os
import urllib
import collections
from time import time

from flask import request, abort

__KEY = os.urandom(33)
__WHITELIST = ['GET', 'OPTIONS']


def validate_request_authentication():
    if (request.method not in __WHITELIST):
        request_date = int(request.headers['X-QIIME-Timestamp'])
        auth, signature = request.headers.get('Authorization').split()
        message = [
            request.method.encode('utf8'),
            request.headers.get('Origin', as_bytes=True),
            request.headers.get('X-QIIME-Timestamp', as_bytes=True),
            request.headers.get('Content-Type', as_bytes=True),
            request.headers.get('Content-Length', as_bytes=True)
        ]
        if (signature.encode('utf8') != make_b64_digest(message) or
                time() - (request_date / 1000) > 60):
            abort(403)


def make_url(host, ihost):
    args = collections.OrderedDict([
        ('type', 'ESTABLISH_CONNECTION'),
        ('uri', host),
        ('secret_key', base64.b64encode(__KEY).decode('ascii'))
    ])
    return 'http://%s/#%s' % (ihost, urllib.parse.urlencode(args))


def make_b64_digest(content):
    hmac_generator = hmac.new(__KEY,
                              digestmod='sha256')
    for value in content:
        hmac_generator.update(value)
    digest = hmac_generator.digest()
    return base64.b64encode(digest)
