const { StatusCodes } = require("http-status-codes");

const HttpErrorHandler = (err, req, res, next) => {
  if (!err) next();

  const error = {
    type: err?.cause?.type || "internal_server_error",
    msg: err?.message || "Some error occured on the server.",
  };

  console.log(`Error: [${req.method}] ${req.path}:\n`, error);

  res
    .status(err?.cause?.code || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error });
};

module.exports = HttpErrorHandler;
