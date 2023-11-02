const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 8080;

// Statische spullen: (https://expressjs.com/en/starter/static-files.html)
//app.use(express.static("static"));
app.use(express.static(path.join(__dirname, "public")));

// Configuratie voor templating
app.set("view engine", "pug");
app.set("views", "myapp/views");

// create application/x-www-form-urlencoded parser
// Nodig om input te parsen vanuit een POST (https://expressjs.com/en/resources/middleware/body-parser.html)
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Hit on app.get/");
});

// POST / gets urlencoded bodies
app.post("/", urlencodedParser, function (req, res) {
  // File inlezen. Komt het studentnummer voor?
  let studentnummer = req.body.studentnummer;
  var array = fs.readFileSync("myapp/studenten.txt").toString().split("\n");

  // Ok. Dus array.indexOf kunnen we gebruiken om
  if (array.includes(studentnummer) === true) {
    res.render("index", { title: "Hey", message: "Gelukt!" });
  } else {
    res.render("index", { title: "Hey", message: "Mislukt!" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
