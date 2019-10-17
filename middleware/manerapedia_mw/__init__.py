from flask import Flask, session

web_api = Flask(__name__)

# Changes this later to something that is not in a repository
web_api.secret_key = b'\x9dtB\xdd\x81b\xd7\xbc\x87\x12i\xd4\xd9\xf3\x95k'

from manerapedia_mw.routes import general, articles, users