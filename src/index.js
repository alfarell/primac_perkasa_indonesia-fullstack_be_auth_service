const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const router = require("./routes");
const middlewares = require("./middlewares");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(morgan("common"));
app.use("/api", router);
app.use(middlewares.NotFound);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
