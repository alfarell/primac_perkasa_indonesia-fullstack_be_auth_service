const express = require("express");
const { AuthController } = require("../controllers");
const { AuthValidator } = require("../validators");
const { AuthService } = require("../services");
const middlewares = require("../middlewares");

const router = express.Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post(
  "/register",
  AuthValidator.register,
  authController.register.bind(authController)
);
router.post(
  "/login",
  AuthValidator.login,
  authController.login.bind(authController)
);
router.get(
  "/user",
  middlewares.AuthenticateToken,
  authController.user.bind(authController)
);

module.exports = router;
