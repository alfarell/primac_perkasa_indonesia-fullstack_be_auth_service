const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");
const { env } = require("../config");

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

  async createUser(payload) {
    const isEmailRegistered = this._checkExistingEmail(payload.email);
    if (isEmailRegistered) {
      throw new Error("Email is registered");
    }

    const isUsernameTaken = this._checkExistingUsername(payload.username);
    if (isUsernameTaken) {
      throw new Error("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(
      payload.password,
      env.bcryptSaltRounds
    );

    const newUser = {
      id: uuid(),
      email: payload.email,
      username: payload.username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(newUser);

    return newUser.id;
  }
}

module.exports = AuthService;
