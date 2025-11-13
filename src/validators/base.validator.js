const { StatusCodes } = require("http-status-codes");

const generateValidator = (validators) => async (req, res, next) => {
  for (const validator of validators) {
    const result = await validator.run(req);
    if (!result.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: Object.values(result.mapped()).at(0) });
    }
  }

  next();
};

module.exports = { generateValidator };
