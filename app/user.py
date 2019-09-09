from elasticsearch import Elasticsearch, exceptions
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

class User():
    es = Elasticsearch('localhost', port=9200)

    def __init__(self, username, access_groups=set(), password_hash=None, ):
        self.username = username
        self.password_hash = password_hash
        self.access_groups = access_groups
    
    @classmethod 
    def generate_from_obj(cls, user_obj):
        user = User(
        username = user_obj["username"],
        password_hash = user_obj["password_hash"])
        user.set_access_groups(user_obj["access_groups"])
        return user

    def is_active(self):
        return True

    def get_id(self):
        return self.username

    def is_authenticated(self):
        return self.authenticated

    def is_anonymous(self):
        return False
    
    @classmethod
    def get(cls, id):
        try:
            user_obj = cls.es.get(index="users", id=id)["_source"]
        except exceptions.NotFoundError:
            return None
        return user_obj

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def set_access_groups(self, access_groups):
        self.access_groups = set()
        for group in access_groups:
            self.access_groups.add(group)
    
    def add_to_access_group(self, access_group):
        self.access_groups.add(access_groups)
    
    def save_into_db(self):
        body = {
            "username": self.username,
            "password_hash": self.password_hash,
            "access_groups": list(self.access_groups)
        }
        try:
            self.es.create(index="users", id=self.username, body=body)
            return True
        except exceptions.ConflictError:
            return False
