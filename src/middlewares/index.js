const AuthenticateToken = require("./auth.middleware");
const ErrorHandler = require("./error.middleware");
const NotFound = require("./notfound.middleware");

module.exports = { NotFound, ErrorHandler, AuthenticateToken };
