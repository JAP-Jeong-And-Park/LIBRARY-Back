const express = require("express");
const app = express();
const mysql = require("mysql");
var router = express.Router();
var main = require("./main/main");
var register = require("./register/register");

router.use("/", main);
router.use("/register", register);

module.exports = router;
