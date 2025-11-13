const { StatusCodes } = require("http-status-codes");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    const body = req.body;

    const userId = await this.authService.createUser(body);

    res.status(StatusCodes.OK).json({ userId });
  }

  async login(req, res) {
    const body = req.body;

    const access = await this.authService.login(body);

    res.status(StatusCodes.OK).json(access);
  }

  async user(req, res) {
    const userDetail = await this.authService.getUserDetail(req?.user?.id);

    res.status(StatusCodes.OK).json(userDetail);
  }
}

module.exports = AuthController;
