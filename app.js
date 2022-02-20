const express = require("express");
const app = express();
const router = require("./router/index");

app.use(router);
// app.get("/", (req, res) => {
//   res.send("hello node");
// });

// app.listen(4000, () => console.log("4000번 포트에서 대기중"));
