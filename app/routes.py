import app.es_wrapper as esw
from app import app
from flask import request, abort

@app.route('/users')
def all_users():
    return esw.get_all_users()
@app.route('/all')
def all():
    return esw.get_all()


@app.route('/<id>')
def article_by_id(id):
    article = esw.get_content_by_id(id)
    if article is None:
        abort(404)
    return article

@app.route('/article/<name>')
def article_by_title(name):
    return esw.get_content_by_title(name)

@app.route('/search')
def search_articles():
    return esw.search(request.args.get('query'))