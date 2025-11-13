const jwt = require("jsonwebtoken");
const { env } = require("../config");

function generateToken(payload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

module.exports = { generateToken };
