const express = require("express");
const app = express();
const router = require("./src/routers/index");

app.use(router);
