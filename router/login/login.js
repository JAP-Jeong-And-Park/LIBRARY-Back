var session = require("express-session");
var MySQLStore = require("express-mysql-session");
const express = require("express");
const app = express();
const mysql = require("mysql");
var router = express.Router();

var options = {
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "BookStore",
};

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

var sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: "my key",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

router.post("/", (req, res) => {
  const name = req.body.name;
  const pw = req.body.pw;
  con.query("select * from user_info where name=?", [name], (err, rows) => {
    if (rows[0].name === name) {
      con.query("select * from user_info where pw=?", [pw], (err, rows) => {
        if (err) {
          throw err;
        }
        if (rows.length) {
          req.session.uname = rows[0].name;
          (req.session.upw = rows[0]), pw;
          req.session.isLogined = true;
          req.session.save(() => {
            res.json({ result: "ok" });
          });
        } else {
          res.json({ result: "pwFalse" });
        }
      });
    } else {
      res.json({ result: "idFalse" });
    }
  });
});
