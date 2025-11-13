const { StatusCodes } = require("http-status-codes");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res, next) {
    const body = req.body;

    try {
      const userId = await this.authService.createUser(body);

      res.status(StatusCodes.OK).json({ userId });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          type: "credential",
          msg: error.message,
        },
      });
    }
  }

  async login(req, res) {
    const body = req.body;

    try {
      const access = await this.authService.login(body);

      res.status(StatusCodes.OK).json(access);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          type: "credential",
          msg: error.message,
        },
      });
    }
  }
}

module.exports = AuthController;
