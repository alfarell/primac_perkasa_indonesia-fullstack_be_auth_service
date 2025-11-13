const AuthenticateToken = require("./auth.middleware");
const HttpErrorHandler = require("./error.middleware");
const NotFound = require("./notfound.middleware");

module.exports = {
  NotFound,
  HttpErrorHandler,
  AuthenticateToken,
};
