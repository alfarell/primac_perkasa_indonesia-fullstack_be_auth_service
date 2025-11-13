const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN) || 3600,
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
};

module.exports = env;
