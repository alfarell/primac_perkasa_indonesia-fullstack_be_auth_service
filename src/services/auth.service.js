const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");
const { env } = require("../config");
const { generateToken } = require("../utils/jwt");
const HttpError = require("../utils/error-builder");
const { StatusCodes } = require("http-status-codes");

class AuthService {
  constructor() {
    this.users = [];
  }

  _checkExistingEmail(email) {
    const findIndex = this.users.findIndex((user) => user.email === email);
    return findIndex >= 0;
  }

  _checkExistingUsername(username) {
    const findIndex = this.users.findIndex(
      (user) => user.username === username
    );
    return findIndex >= 0;
  }

  _getUserByUsername(username) {
    const user = this.users.find((user) => user.username === username);
    return user;
  }

  _getUserById(userId) {
    const user = this.users.find((user) => user.id === userId);
    return user;
  }

  async _validateCredential(credential, encrypted) {
    const isMatch = await bcrypt.compare(credential, encrypted);
    if (!isMatch) {
      throw HttpError.build({
        code: StatusCodes.BAD_REQUEST,
        type: "credential",
        msg: "Pasword is incorrect",
      });
    }
  }

  async createUser(payload) {
    const isEmailRegistered = this._checkExistingEmail(payload.email);
    if (isEmailRegistered) {
      throw HttpError.build({
        code: StatusCodes.BAD_REQUEST,
        type: "credential",
        msg: "Email is already registered",
      });
    }

    const isUsernameTaken = this._checkExistingUsername(payload.username);
    if (isUsernameTaken) {
      throw HttpError.build({
        code: StatusCodes.BAD_REQUEST,
        type: "credential",
        msg: "Username is already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(
      payload.password,
      env.bcryptSaltRounds
    );

    const newUser = {
      id: uuid(),
      email: payload.email,
      username: payload.username,
      name: payload.name,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(newUser);

    return newUser.id;
  }

  async login(credential) {
    const user = this._getUserByUsername(credential.username);
    if (!user || !user?.username) {
      throw HttpError.build({
        code: StatusCodes.BAD_REQUEST,
        type: "credential",
        msg: `User with username: ${credential.username} does not exist`,
      });
    }

    await this._validateCredential(credential.password, user.password);

    const userPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = generateToken(userPayload);

    const access = {
      accessToken,
      expiredIn: new Date(
        new Date().getTime() + env.jwtExpiresIn
      ).toISOString(),
      duration: env.jwtExpiresIn,
      user: userPayload,
    };

    return access;
  }

  async getUserDetail(userId) {
    if (!userId) {
      throw HttpError.build({
        code: StatusCodes.BAD_REQUEST,
        type: "user_detail",
        msg: "User id is not defined",
      });
    }

    const user = this._getUserById(userId);

    if (!user) {
      throw HttpError.build({
        code: StatusCodes.BAD_REQUEST,
        type: "user_detail",
        msg: "User profile not found",
      });
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userData;
  }
}

module.exports = AuthService;
