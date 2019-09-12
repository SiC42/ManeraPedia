import app.es_wrapper as esw
from app.exceptions import *
from app import app
from flask import request, abort, redirect, url_for, jsonify
import flask
import flask_login


@app.route('/all_articles')
def get_all_articles():
    return esw.articles.get_all()


@app.route('/article/<id>', methods=['GET'])
@flask_login.login_required
def get_article_by_id(id):
    print("test")
    article = esw.articles.get_by_id(id, flask_login.current_user.access_groups)
    if article is None:
        abort(404)
    return article

@app.route('/search')
@flask_login.login_required
def search_article():
    return esw.articles.search(request.args.get('query'), flask_login.current_user.access_groups)

@app.route('/test')
def test():
    return str(esw.articles.title_is_unique("01. April 2019", id="IZhRJm0BY3eCqh1MtDze"))

# ============== (POST) ==============================
@app.route('/article', methods=['POST'])
@flask_login.login_required
def create_article():
    article = request.json
    if "_id" in article.keys():
        raise ForbiddenIdEx()
    if not esw.articles.title_is_unique(article["title"]):
        raise TitleAlreadyExistsEx()
    res = esw.articles.create(article)
    return redirect(url_for('get_article_by_id', id=res["_id"]))

# ============== Update stuff (PUT) ==============================
@app.route('/article/<id>', methods=['PUT'])
@flask_login.login_required
def update_article(id):
    if not user_is_privilged(id):
        abort(403)
    article = request.json
    if not esw.articles.title_is_unique(article["title"], id):
        raise TitleAlreadyExistsEx()
    esw.articles.update(id, request.json)
    return esw.articles.get_by_id(id)

# ============== Delete stuff (DELETE) ==============================
@app.route('/article/<id>', methods=['DELETE'])
@flask_login.login_required
def delete_article(id):
    if not user_is_privilged(id):
        abort(403)
    esw.articles.delete(id)
    return "Deleted"


# ============== Helper functions ===================================
def user_is_privilged(id):
    user_access_groups = flask_login.current_user.access_groups
    article_rights = esw.articles.get_access_rights(id)
    return any(group in article_rights["write"] for group in user_access_groups)
