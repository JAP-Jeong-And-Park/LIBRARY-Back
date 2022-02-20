const express = require("express");
const app = express();
const mysql = require("mysql");
var router = express.Router();
var main = require("./main/main");

router.use("/", main);

module.exports = router;
