export class NotLoggedInException extends Error {
  constructor(message = "You need to be logged in!", ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotLoggedInException);
    }
    this.message = message;
  }
}
