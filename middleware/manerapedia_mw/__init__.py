from flask import Flask, session
from flask_cors import CORS

web_api = Flask(__name__)
web_api.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(web_api)

# Changes this later to something that is not in a repository
web_api.secret_key = b'\x9dtB\xdd\x81b\xd7\xbc\x87\x12i\xd4\xd9\xf3\x95k'

from manerapedia_mw.routes import general, articles, users