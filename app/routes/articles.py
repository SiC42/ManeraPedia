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
def get_article_by_id(id):
    article = esw.articles.get_by_id(id)
    if article is None:
        abort(404)
    return article

@app.route('/search')
@flask_login.login_required
def search_article():
    return esw.articles.search(request.args.get('query'), flask_login.current_user.access_groups)

@app.route('/test')
def test():
    return str(esw.articles.title_is_unique("Orden des Schwarzen Schnees in Gentinen", "HtPBFW0BwxbmG1rCP5dj2"))
     


# ============== (POST) ==============================
@app.route('/article', methods=['POST'])
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
def update_article(id):
    article = request.json
    if not esw.articles.title_is_unique(article["title"], id):
        raise TitleAlreadyExistsEx()
    esw.articles.update(id, request.json)
    return esw.articles.get_by_id(id)

# ============== Delete stuff (DELETE) ==============================
@app.route('/article/<id>', methods=['DELETE'])
def update_article(id):
    article = request.json
    if not esw.articles.title_is_unique(article["title"], id):
        raise TitleAlreadyExistsEx()
    esw.articles.update(id, request.json)
    return esw.articles.get_by_id(id)
