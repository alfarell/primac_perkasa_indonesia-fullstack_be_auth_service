const express = require("express");
const AuthRoute = require("./auth.route");

const router = express.Router();

router.use("/auth", AuthRoute);

module.exports = router;
