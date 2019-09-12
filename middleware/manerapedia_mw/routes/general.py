from manerapedia_mw import web_api
from flask import url_for

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

@web_api.route("/")
def site_map():
    links = []
    for rule in web_api.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))
    links_html = "<ul>"
    for link in links:
        links_html += '<li><a href="{}">{}</a></li>'.format(link[0], link[1])
    links_html += "</ul>"
    return links_html