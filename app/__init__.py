from flask import Flask, session

app = Flask(__name__)

# Changes this later to something that is not in a repository
app.secret_key = b'\x9dtB\xdd\x81b\xd7\xbc\x87\x12i\xd4\xd9\xf3\x95k'



from app import routes, login_manager