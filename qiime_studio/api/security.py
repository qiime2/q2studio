import hmac
import base64
import binascii
import os
import urllib
import collections

from flask import request, abort

__KEY = os.urandom(33)


def validate_request_authentication():
    message = b"test"
    unhexed = binascii.unhexlify(request.args['signature'])
    if (base64.b64encode(unhexed) != make_b64_digest(message)):
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
    digest = hmac.new(base64.b64encode(__KEY), msg=content, digestmod="sha256").digest()
    return base64.b64encode(digest)
