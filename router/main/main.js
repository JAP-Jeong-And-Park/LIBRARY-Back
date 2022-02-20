const express = require("express");
const app = express();
const mysql = require("mysql");
var router = express.Router();

router.get("/", (req, res) => {
  if (req.session.isLoggin) {
    res.render("hidden");
  } else {
    res.render("main");
  }
});

module.exports = router;
