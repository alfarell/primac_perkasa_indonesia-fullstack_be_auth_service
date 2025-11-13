const { StatusCodes } = require("http-status-codes");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res, next) {
    const body = req.body;

    const userId = await this.authService.createUser(body);

    res.status(StatusCodes.OK).json({ userId });
  }

  async login(req, res) {
    const body = req.body;

    const access = await this.authService.login(body);

    res.status(StatusCodes.OK).json(access);
  }
}

module.exports = AuthController;
