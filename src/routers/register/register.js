const express = require("express");
const app = express();
const mysql = require("mysql");
var router = express.Router();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "BookStore",
});

con.connect();
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("register");
});
router.post("/", (req, res) => {
  const name = req.body.name;
  const pw = req.body.pw;
  const sql_insert = { name, pw };
  con.query("select name from user_info where name=?", [name], (err, rows) => {
    if (rows.length) {
      res.json({ result: "fail" });
    } else {
      con.query("insert into user_info set?", sql_insert, (err, rows) => {
        if (err) throw err;
        console.log("ok");
        res.json({ result: "success" });
      });
    }
  });
});

module.exports = router;
