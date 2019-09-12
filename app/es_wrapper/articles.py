from elasticsearch import Elasticsearch, exceptions

es = Elasticsearch('localhost', port=9200)
wiki_index_name = "wiki"

def get_all():
    res =  es.search(index=wiki_index_name, 
                    body={"query": {"match_all": {}}},
                    _source_excludes=[])
    return res

def get_by_id(id):
    try:
        res = es.get(index=wiki_index_name, id=id)
    except exceptions.NotFoundError:
        return None
    return res

def get_by_title(title):
    res = es.search(index=wiki_index_name, 
                    body={"query": {"term": {"title.raw": title}}},
                    _source_excludes=["access"])
    return res

def search(query, access_groups):
    body =  {"query": 
        {"bool": {
            "must": {"match": {"body" : query}}}
        }
    }  
    body["query"]["bool"]["filter"] = {"bool" : {"should": []}}
    should_include = body["query"]["bool"]["filter"]["bool"]["should"]
    for access_group in access_groups:
        should_include.append({ "term": { "access.read": access_group }})
    res = es.search(index=wiki_index_name, body=body)
    return res


def title_is_unique(title, id=None):
    body =  {"query": 
        {"bool": {
            "must": {"term": {"title.raw" : title}}}
        }
    }
    if title is not None:
        body["query"]["bool"]["must_not"] = {"term": {"_id": id}}
    res = es.search(index=wiki_index_name, body=body, _source=False)
    return res["hits"]["total"]["value"] == 0
    

def create(body):
    return es.index(index=wiki_index_name, body=body)


def update(id, body):
    return es.update(index=wiki_index_name, id=id, body=body) 