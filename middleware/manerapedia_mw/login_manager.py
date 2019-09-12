from manerapedia_mw import web_api
from manerapedia_mw.user import User
from flask_login import LoginManager

login_manager = LoginManager()
login_manager.init_app(web_api)

@login_manager.user_loader
def user_loader(username):
    if username is None:
        return
    user_obj = User.get(username)
    if user_obj is None:
        return

    user = User.generate_from_obj(user_obj)
    return user


@login_manager.request_loader
def request_loader(request):
    username = request.form.get('username')
    if username is None:
        return
    user_obj = User.get(username)
    if user_obj is None:
        return

    user = User.generate_from_obj(user_obj)

    user.is_authenticated = user.check_password_hash(request.form.get('password'))

    return user
