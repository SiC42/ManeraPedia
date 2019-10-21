import manerapedia_mw.es_wrapper as esw
from manerapedia_mw.user import User
from manerapedia_mw import web_api
from flask import request, redirect, url_for, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, create_refresh_token, get_jwt_claims
)

jwt = JWTManager(web_api)
@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    user_obj = User.get(identity)
    return {
        'username': user_obj["username"],
        'access_groups': user_obj["access_groups"]
    }


@web_api.route('/users')
def all_users():
    return esw.users.get_all_users()


@web_api.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    user_obj = User.get(username)
    print(user_obj)
    if user_obj is None:
        return jsonify({"msg": "Bad username or password"}), 401
    user = User.generate_from_obj(user_obj)
    if not user.check_password(password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user_obj["username"])
    refresh_token = create_refresh_token(identity=user_obj["username"])
    return jsonify(access_token=access_token,
                   refresh_token=refresh_token,
                   info={"username": user_obj["username"], "access_groups": user_obj["access_groups"]}), 200


@web_api.route('/register', methods=['POST'])
# @jwt_required
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    access_group = request.json.get('access_group', None)
    user = User(
        username=request.form["username"],
        access_group=request.form.getlist('access_groups')
    )
    user.set_password(password)
    user.save_into_db()
    access_token = create_access_token(identity=username)
    refresh_token = create_refresh_token(identity=username)
    return {
        'message': 'User {} was created'.format(username),
        'access_token': access_token,
        'refresh_token': refresh_token
    }


@web_api.route('/protected')
@jwt_required
def protected():
    claims = get_jwt_claims()
    print(claims)
    return claims, 200
