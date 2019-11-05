import manerapedia_mw.es_wrapper as esw
from manerapedia_mw.exceptions import *
from manerapedia_mw import web_api
from flask import request, abort, redirect, url_for, jsonify
import flask
from flask_jwt_extended import (
    jwt_required, get_jwt_claims as claims
)


@web_api.route('/all_articles')
def get_all_articles():
    return esw.articles.get_all()


@web_api.route('/article', methods=['GET'])
@jwt_required
def get_article():
    article = None
    if request.args.get('id'):
        article = esw.articles.get_article_by_id(
            request.args.get('id'), claims()["access_groups"])
    if request.args.get('title'):
        print(request.args.get('title'))
        article = esw.articles.get_article_by_title(
            request.args.get('title'), claims()["access_groups"])
    if article is None:
        return jsonify({"msg": "Artikle not found."}), 404
    return article


@web_api.route('/search')
@jwt_required
def search_article():
    if not request.args.get('query'):
        return jsonify({"msg": "Missing query parameter"}), 400
    if request.args.get('autosuggest'):
        return esw.articles.autosuggester(
            request.args.get('query'), claims()["access_groups"])
    return esw.articles.search(request.args.get('query'), claims()["access_groups"])


@web_api.route('/test_unique')
def test():
    title = request.args.get('title')
    id = request.args.get('id')
    if id is None or title is None:
        return "Make sure to provide a title and an id"
    return "title={}<br>id={}<br>IsUnqiue={}".format(title, id, str(esw.articles.title_is_unique("22.01.2019 - Ein neuer Gefährte", id="Tevv7W0BbIDzQhiPeGZx")))

# ============== (POST) ==============================
@web_api.route('/article', methods=['POST'])
@jwt_required
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
@jwt_required
def update_article(id):
    if not user_is_privilged(id):
        abort(403)
    article = request.json
    if not esw.articles.title_is_unique(article["title"], id):
        raise TitleAlreadyExistsEx()
    esw.articles.update(id, request.json)
    return esw.articles.get_article_by_id(id)

# ============== Delete stuff (DELETE) ==============================
@web_api.route('/article/<id>', methods=['DELETE'])
@jwt_required
def delete_article(id):
    if not user_is_privilged(id):
        abort(403)
    esw.articles.delete(id)
    return "Deleted"


# ============== Helper functions ===================================
def user_is_privilged(id):
    user_access_groups = claims()["access_groups"]
    article_rights = esw.articles.get_access_rights(id)
    return any(group in article_rights["write"] for group in user_access_groups)
