const express = require("express");
const Notify = require("../src/index");

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  Notify.email(req.query.message, req.query.to).then(() => {
    res.send("notified");
  });
});

app.listen(port, err => {
  if (err) {
    console.error("failed to listen, e=", err);
    return;
  }
  console.log("listening on port " + port);
});
