import manerapedia_mw.es_wrapper as esw
from manerapedia_mw.exceptions import *
from manerapedia_mw import web_api
from flask import request, abort, redirect, url_for, jsonify
import flask
import flask_login


@web_api.route('/all_articles')
def get_all_articles():
    return esw.articles.get_all()


@web_api.route('/article/<id>', methods=['GET'])
@flask_login.login_required
def get_article_by_id(id):
    print("test")
    article = esw.articles.get_by_id(id, flask_login.current_user.access_groups)
    if article is None:
        abort(404)
    return article

@web_api.route('/search')
@flask_login.login_required
def search_article():
    return esw.articles.search(request.args.get('query'), flask_login.current_user.access_groups)

@web_api.route('/test')
def test():
    return str(esw.articles.title_is_unique("01. April 2019", id="IZhRJm0BY3eCqh1MtDze"))

# ============== (POST) ==============================
@web_api.route('/article', methods=['POST'])
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
@web_api.route('/article/<id>', methods=['PUT'])
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
@web_api.route('/article/<id>', methods=['DELETE'])
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
