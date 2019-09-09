from elasticsearch import Elasticsearch, exceptions

es = Elasticsearch('localhost', port=9200)


def get_all_users():
    res =  es.search(index="users", body={"query": {"match_all": {}}})
    return res

def get_all_articles():
    res =  es.search(index="wiki", 
                    body={"query": {"match_all": {}}},
                    _source_excludes=["access"])
    return res

def get_article_by_id(id):
    try:
        res = es.get(index="wiki", id=id)
    except exceptions.NotFoundError:
        return None
    return res

def get_article_by_title(title):
    res = es.search(index="wiki", 
                    body={"query": {"term": {"title.raw": title}}},
                    _source_excludes=["access"])
    return res

def search_articles(query):
    body =  {   
        "_source": {"excludes": ["access"]},
        "query": { 
            "match": {
                "body" : {"query": query}
            }
        }
    }
    res = es.search(index="wiki", body=body)
    return res