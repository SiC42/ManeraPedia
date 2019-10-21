from elasticsearch import Elasticsearch, exceptions
from elasticsearch_dsl import Search, Q
from elasticsearch_dsl.query import MultiMatch

client = Elasticsearch('localhost', port=9200)
wiki_index_name = "wiki"


def get_all():
    s = Search(using=client, index=wiki_index_name) \
        .query("match_all")
    res = s.execute()
    return res.to_dict()


def get_by_id(id, access_groups):
    s = Search(using=client, index=wiki_index_name)
    s = s.filter(access_filter(access_groups))
    s = s.query("match", _id=id)
    s = s.source(excludes=["access"])

    res = s.execute()
    if res.hits.total.value != 1:
        return None
    print("response =", res.hits[0])
    return res.hits[0].to_dict()


def get_access_rights(id):
    try:
        res = client.get(index=wiki_index_name, id=id)
    except exceptions.NotFoundError:
        return None
    access_rights = res["_source"]["access"]
    return access_rights


def autosuggester(phrase, access_groups):
    """Autosuggest article based on title"""
    s = Search(using=client, index=wiki_index_name)
    s = s.filter(access_filter(access_groups))
    multi_match = MultiMatch(
        query=phrase,
        type="bool_prefix",
        fields=["title.completion", "title.completion._2gram", "title.completion._3gram"])
    q = Q("bool", must=multi_match)
    s = s.query(q)
    s = s.source(includes=["title"])
    res = s.execute()
    return res.to_dict()


def search(query, access_groups):
    s = Search(using=client, index=wiki_index_name)
    s = s.filter(access_filter(access_groups))
    q = Q("bool", must=Q("match", body=query))
    s = s.query(q)
    res = s.execute()
    return res.to_dict()


def title_is_unique(title, id=None):
    s = Search(using=client, index=wiki_index_name)
    if id is None:
        q = Q("bool", must=Q("term", title__raw=title))
    else:
        q = Q("bool", must=Q("term", title__raw=title),
              must_not=Q("term", _id=id))
    s = s.query(q)
    s = s.source(False)
    res = s.execute()
    return res.hits.total.value == 0


def create(body):
    return client.index(index=wiki_index_name, body=body)


def update(id, body):
    return client.update(index=wiki_index_name, id=id, body=body)


def delete(id):
    return client.delete(index=wiki_index_name, id=id)


# ======================= Helper functions =======================
def access_filter(access_groups):
    should = (Q("term", access__read=access_group)
              for access_group in access_groups)
    filter_q = Q("bool", should=list(should))
    return filter_q
