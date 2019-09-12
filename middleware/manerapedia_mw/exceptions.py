import werkzeug.exceptions as ex
from manerapedia_mw import web_api

class ForbiddenIdEx(ex.HTTPException):
    code = 403
    description = 'Creating own IDs is not allowed!'

class TitleAlreadyExistsEx(ex.HTTPException):
    code = 403
    description = 'An article with this title already exists'

@web_api.errorhandler(ForbiddenIdEx)
def handle_forbidden_id(error):
    return error, 403

@web_api.errorhandler(TitleAlreadyExistsEx)
def handle_title_already_exists(error):
    return error, 403