import app.es_wrapper as esw
from app.user import User
from app import app
from flask import request, abort, redirect, url_for
import flask_login

@app.route('/users')
def all_users():
    return esw.users.get_all_users()

@app.route('/all_articles')
def all_articles():
    return esw.articles.get_all_articles()


@app.route('/<id>')
def article_by_id(id):
    article = esw.articles.get_article_by_id(id)
    if article is None:
        abort(404)
    return article

@app.route('/article/<name>')
def article_by_title(name):
    return esw.articles.get_article_by_title(name)

@app.route('/search')
@flask_login.login_required
def search_articles():
    return esw.articles.search_articles(request.args.get('query'), flask_login.current_user.access_groups)

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
                <input type="checkbox" name="access_groups[]" value="general">
                General
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


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

@app.route("/")
def site_map():
    links = []
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))
    links_html = "<ul>"
    for link in links:
        links_html += '<li><a href="{}">{}</a></li>'.format(link[0], link[1])
    links_html += "</ul>"
    return links_html