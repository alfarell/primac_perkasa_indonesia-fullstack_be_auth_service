const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const config = require("./config");
const router = require("./routes");
const middlewares = require("./middlewares");

const PORT = config.env.port;

const app = express();

app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use("/api", router);
app.use(middlewares.HttpErrorHandler);
app.use(middlewares.NotFound);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
