const routes = require("./core/routes");
const app = require("./core/app");
app.use(routes);
app.get("/", function (req, res) {
  res.json({
    status: "online",
    author: "wiz64",
    github: "https://github.com/wiz64/Sinfo",
  });
});
app.use("/*", express.static("public_html"));
console.log("----- Starting -----");
app.listen(8000, () => console.log("Server listening on 8000"));
