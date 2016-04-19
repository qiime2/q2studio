from flask import request

def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Headers', ','.join(request.headers.keys()))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
