const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

// Statische spullen: (https://expressjs.com/en/starter/static-files.html)
//app.use(express.static("static"));
app.use(express.static(path.join(__dirname, "public")));

// create application/x-www-form-urlencoded parser
// Nodig om input te parsen vanuit een POST (https://expressjs.com/en/resources/middleware/body-parser.html)
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Hit on app.get/");
});

// POST / gets urlencoded bodies
app.post("/", urlencodedParser, function (req, res) {
  res.send("welcome, " + req.body.studentnummer);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
