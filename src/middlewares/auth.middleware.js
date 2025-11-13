const { StatusCodes } = require("http-status-codes");
const ErrorBuilder = require("../utils/error-builder");
const { verifyToken } = require("../utils/jwt");

const AuthenticateToken = (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    throw ErrorBuilder.build({
      code: StatusCodes.UNAUTHORIZED,
      type: "authorization",
      msg: "Missing Authorization header",
    });
  }

  const token = authHeader.split(" ")[1]; // format: Bearer <token>
  if (!token) {
    throw ErrorBuilder.build({
      code: StatusCodes.UNAUTHORIZED,
      type: "authorization",
      msg: "Invalid Authorization header format",
    });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;

    next();
  } catch (err) {
    console.log("token error", err);
    if (err.name === "TokenExpiredError") {
      throw ErrorBuilder.build({
        code: StatusCodes.UNAUTHORIZED,
        type: "authorization",
        msg: "Token expired, please log in again",
      });
    } else if (err.name === "JsonWebTokenError") {
      throw ErrorBuilder.build({
        code: StatusCodes.UNAUTHORIZED,
        type: "authorization",
        msg: "Invalid token",
      });
    } else {
      throw ErrorBuilder.build({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        type: "authorization",
        msg: "Failed to authenticate token",
      });
    }
  }
};

module.exports = AuthenticateToken;
