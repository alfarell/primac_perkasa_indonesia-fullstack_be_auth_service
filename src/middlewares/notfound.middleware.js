const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const NotFound = (_, res) => {
  res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
};

module.exports = NotFound;
