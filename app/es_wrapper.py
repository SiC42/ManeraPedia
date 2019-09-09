from elasticsearch import Elasticsearch, exceptions

es = Elasticsearch('localhost', port=9200)

def get_all():
    res =  es.search(index="wiki", body={"_source": {"excludes": ["access"]}, "query": {"match_all": {}}})
    return res

def get_content_by_id(id):
    try:
        res = es.get(index="wiki", id=id)
    except exceptions.NotFoundError:
        return None
    return res

def get_content_by_title(title):
    res = es.search(index="wiki", body={"query": {"term": {"title.raw": title}}})
    return res

def search(query):
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