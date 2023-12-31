/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Variables for the webserver
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express = require("express");
const app = express();
const port = 8080;
//const hostname = '0.0.0.0'

// Needed to retrieve data from the body
const bodyParser = require("body-parser");
const path = require("path");
const student = require("./getStudentFirstName");
const {voornaam} = require("./getStudentFirstName");
const res = require("express/lib/response");


// Webserver-configuration:
// For the static website: (https://expressjs.com/en/starter/static-files.html)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", "./views");

//const fs = require("fs"); // Currently we don't need FS anymore. Later with the database-copy we will re-enable it.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Start van code
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// create application/x-www-form-urlencoded parser
// We need this to parse inport from a POST (https://expressjs.com/en/resources/middleware/body-parser.html)
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/", urlencodedParser, function (req, res) {

  let studentnummer = req.body.studentnummer;

  // Yes! Dit blok geeft de studentvoornaam!
  // voornaam(studentnummer).then(
  //     console.log)

  voornaam(studentnummer).then(
      (value) => {
        if (value=="NOSTUDENT") {
          console.error("Student not found")
          res.status(404).send("Student not found");
          }
        else
          //res.render("download", { title: "Hey", message: "Gelukt!" });
          res.render("download", { voornaam: "#{value}" });
      },
      (reason) => {
        console.error(reason);
      }
  );

  //getStudentFirstName(IntStudentnummer).then(console.log)

// We need this copy later on.
//   fs.copyFile('./myapp/database/bierendb.db', './myapp/database/'+studentnummer+'.db', (err) => {

});

app.listen(port, hostname => {
  console.log(`Express started on ${port}`);
});
