const { body, header } = require("express-validator");
const { generateValidator } = require("./base.validator");

class AuthSchema {
  static get register() {
    return generateValidator([
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
      body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username should be string")
        .isLength({ min: 6 })
        .withMessage("Username should not less than 6 character"),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password should be string")
        .isStrongPassword()
        .withMessage(
          "Password should be combination of lower case, upper case, numbers, and special character."
        ),
      body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Username is required"),
    ]);
  }

  static get login() {
    return generateValidator([
      body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username should be string")
        .isLength({ min: 6 })
        .withMessage("Username should not less than 6 character"),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password should be string"),
    ]);
  }

  static get user() {
    return generateValidator([]);
  }
}

module.exports = AuthSchema;
