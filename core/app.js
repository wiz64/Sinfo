const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const routes = require("./routes");

app.use(cookieParser());
app.use(express.json());
// Routes used for API
app.use(routes);

module.exports = app;
