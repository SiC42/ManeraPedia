export default class NotLoggedInException extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotLoggedInException);
    }
    if (params.actionType) {
      this.actionType = params.actionType;
    }
    this.message = "You need to be logged in!";
  }
}
