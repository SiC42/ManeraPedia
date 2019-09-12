import werkzeug.exceptions as ex
from app import app

class ForbiddenIdEx(ex.HTTPException):
    code = 403
    description = 'Creating own IDs is not allowed!'

class TitleAlreadyExistsEx(ex.HTTPException):
    code = 403
    description = 'An article with this title already exists'

@app.errorhandler(ForbiddenIdEx)
def handle_forbidden_id(error):
    return error, 403

@app.errorhandler(TitleAlreadyExistsEx)
def handle_title_already_exists(error):
    return error, 403