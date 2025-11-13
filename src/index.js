const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(morgan("common"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
