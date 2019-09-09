import app.es_wrapper as esw
from app.user import User
from app import app
from flask import request, abort, redirect, url_for
import flask_login

@app.route('/users')
def all_users():
    return esw.get_all_users()

@app.route('/all_articles')
def all():
    return esw.get_all()


@app.route('/<id>')
def article_by_id(id):
    article = esw.get_article_by_id(id)
    if article is None:
        abort(404)
    return article

@app.route('/article/<name>')
def article_by_title(name):
    return esw.get_article_by_title(name)

@app.route('/search')
def search_articles():
    return esw.search_articles(request.args.get('query'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return '''
            <form action='login' method='POST'>
            <input type='text' name='username' id='username' placeholder='username'/>
            <input type='password' name='password' id='password' placeholder='password'/>
            <input type='submit' name='submit'/>
            </form>
            '''
    username = request.form['username']
    print("username =", username)
    user_obj = User.get(username)
    print("object =", user_obj)
    if user_obj is not None:
        user = User.generate_from_obj(user_obj)
        print("password_check = ", user.check_password(request.form['password']))
        if user.check_password(request.form['password']):
            flask_login.login_user(user)
            return redirect(url_for('protected'))
    return 'Bad login'

@app.route('/register', methods=['GET','POST'])
#@flask_login.login_required
def register():
    if request.method == 'GET':
        return '''
            <form action='register' method='POST'>
            <input type='text' name='username' id='username' placeholder='username'/>
            <input type='password' name='password' id='password' placeholder='password'/>
            <fieldset>
                <input type="checkbox" name="access_groups[]" value="gm">
                GM
                <input type="checkbox" name="access_groups[]" value="dw">
                Dungeon World
                <input type="checkbox" name="access_groups[]" value="bw">
                Burning Wheel
            </fieldset>
            <input type='submit' name='submit'/>
            </form>
            '''
    print(request.form)
    user = User(username=request.form["username"])
    user.set_password(request.form["password"])
    user.set_access_groups(request.form.getlist('access_groups[]'))
    user.save_into_db()
    return redirect(url_for('all_users'))

@app.route('/protected')
@flask_login.login_required
def protected():
    return 'Logged in as: ' + flask_login.current_user.username

@app.route('/logout')
def logout():
    flask_login.logout_user()
    return 'Logged out'
