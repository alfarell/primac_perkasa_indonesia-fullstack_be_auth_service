const { StatusCodes } = require("http-status-codes");

const HttpErrorHandler = (err, _, res, next) => {
  if (!err) next();

  const error = {
    type: err?.cause?.type || "internal_server_error",
    msg: err?.message || "Some error occured on the server.",
  };
  res
    .status(err?.cause?.code || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error });
};

module.exports = HttpErrorHandler;
