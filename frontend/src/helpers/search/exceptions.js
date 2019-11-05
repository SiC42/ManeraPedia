export default class ArticleNotFoundException extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ArticleNotFoundException);
    }
    if (params.request) {
      this.request = params.request;
    }
    if (params.message) {
      this.message = params.message;
    }
  }
}
