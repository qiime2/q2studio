from qiime_studio import start_server

# Allows `python -m qiime_studio` to start the server. This avoids polluting
# the user's namespace with "useless" binary.
if __name__ == '__main__':
    try:
        start_server()
    except KeyboardInterrupt:
        pass
