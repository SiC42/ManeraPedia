from elasticsearch import Elasticsearch, exceptions
from elasticsearch_dsl import Search

client = Elasticsearch('localhost', port=9200)
user_index_name = "users"


def get_all_users():
    s = Search(using=client, index=user_index_name) \
        .query("match_all")
    res = s.execute()
    return res.to_dict()
