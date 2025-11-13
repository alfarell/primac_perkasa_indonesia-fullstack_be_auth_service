const { StatusCodes } = require("http-status-codes");

const generateValidator = (validators) => async (req, res, next) => {
  for (const validator of validators) {
    const result = await validator.run(req);
    if (!result.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: result.mapped() });
    }
  }

  next();
};

module.exports = { generateValidator };
