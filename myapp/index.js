const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Statische spullen: (https://expressjs.com/en/starter/static-files.html)
//app.use(express.static("static"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Hit on app.get/");
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
  console.log("Hit on POST at app.post/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
