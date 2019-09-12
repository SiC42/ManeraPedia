from elasticsearch import Elasticsearch, exceptions

es = Elasticsearch('localhost', port=9200)

def get_all_users():
    res =  es.search(index="users", body={"query": {"match_all": {}}})
    return res