/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import of necessary modules
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fs = require("fs");
const express = require("express");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Variables for the webserver
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express();
const port = 8080;
//const hostname = '0.0.0.0'

// Needed to retrieve data from the body
const bodyParser = require("body-parser");
const path = require("path");
const student = require("./getStudentFirstName");
const {GetFirstName} = require("./getStudentFirstName");
const res = require("express/lib/response");

// Webserver-configuration:
// For the static website: (https://expressjs.com/en/starter/static-files.html)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", "myapp/views");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Start van code
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// create application/x-www-form-urlencoded parser
// We need this to parse import from a POST (https://expressjs.com/en/resources/middleware/body-parser.html)
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/", urlencodedParser, function (req, res) {

  let studentnummer = req.body.studentnummer;

  GetFirstName(studentnummer).then(
      (value) => {
        if (value=="NOSTUDENT") {
          console.error("Studentnummer komt niet voor. Heb je een goed nummer ingevuld?")
          res.status(404).send("Student not found");
          }
        else
          voornaam = value;
          console.log("voornaam ==", voornaam)
          console.log("studentnummer ==", studentnummer);

          fs.copyFile('./myApp/database/bierendb.db', './myApp/public/databases/'+studentnummer+'.db', (err) => {
              if (err) throw err;
              console.log('Database copied ')
          });

          // FIXME: Vanaf hier moet de database-mangler beginnen :)


          res.render("download", { voornaam: value });
      },
      (reason) => {
        console.error(reason);
      }
                );
});

app.listen(port, hostname => {
  console.log(`Express started on ${port}`);
});
