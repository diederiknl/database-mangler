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
const hostname = '0.0.0.0'

// Needed to retrieve data from the body
const bodyParser = require("body-parser");
const path = require("path");
const {GetFirstName} = require("./getStudentFirstName");
const res = require("express/lib/response");

// Database mangler
const {mangler} = require("./mangler.js");

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
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/", urlencodedParser, function (req, res)
{
    let studentnummer = req.body.studentnummer;
    const firstname = GetFirstName(studentnummer)
        .then(
            (value) => {
                // Was there a student? Or a DUD? If so, 404.
                if (value == "NOSTUDENT") {
                    console.error("Studentnummer komt niet voor. Heb je een goed nummer ingevuld?")
                    res.status(404).send("Student not found");
                } else {
                    // res.render("index", {title: "Hey", message: `Hello ${value}`});
                    console.log(value, studentnummer)
                    // Hierboven hebben we alle gegevens!
                    // Let's copy the database with the studentnumber:

                    fs.copyFile('database/bierendb.db', 'public/databases/'+studentnummer+'.db', (err) => {
                        if (err) throw err;
                        console.log('Database copied ')
                    });





                }
            })
        .then((value) =>
            {
                return(firstname)
            })
        .catch((err) =>
            {
                console.error(err);
                res.status(500).send("Internal server error");
            })
        .finally(() =>
            {
                console.log("Finally, we are done!");
            })


});

    app.listen(port, hostname, () => { console.log(`Express started on ${port}`); });
