
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Headers',
                         "Authorization, Content-Type, " +
                         "Content-Length, X-QIIME-Timestamp")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
