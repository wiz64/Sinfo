const express = require("express");
const app = require("./core/app");
require("./core/config/dbConnection");
// Test Routes
app.get("/", function (req, res) {
  res.json({
    status: "online",
    author: "wiz64",
    github: "https://github.com/wiz64/Sinfo",
  });
});
// use of public folder
app.use("/*", express.static("public_html"));

console.log("----- Starting -----");
// listening server

app.listen(8000, () => console.log("Server listening on 8000"));
