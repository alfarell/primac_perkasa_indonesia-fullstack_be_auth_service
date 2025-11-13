class HttpError {
  static build({ msg, type, code } = {}) {
    const error = new Error(msg, {
      cause: {
        type,
        code,
      },
    });

    return error;
  }
}

module.exports = HttpError;
