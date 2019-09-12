import app.es_wrapper as esw
from app import app
from flask import request, abort
import flask_login


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
