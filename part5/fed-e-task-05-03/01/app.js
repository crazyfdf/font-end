const express = require("./express");
const app = express();
app.use(function (req, res, next) {
  res.end("hello");
});
app.get("/ab/:cd", (req, res, next) => {
  console.log(req.params);
  next();
});
app.get(
  "/ab/:cd",
  (req, res, next) => {
    console.log(req.params);
    next();
  },
  (req, res, next) => {
    console.log(req.params);
    next();
  },
  (req, res, next) => {
    console.log(req.params);
    res.end("get /");
  }
);
app.post("/about", (req, res) => {
  res.end("post /about");
});
app.put("/about", (req, res) => {
  res.end("put /about");
});
app.delete("/about", (req, res) => {
  res.end("delete /about");
});
console.log(app._router);
app.listen(1234, () => {
  console.log(3000);
});
