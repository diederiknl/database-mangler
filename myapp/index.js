const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 8080;
const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database('./myapp/database/bierendb.db');

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

    // db.serialize(() => {
    //   db.run("CREATE TABLE lorem (info TEXT)");
  
    //   const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    //   console.log(stmt);
    //   for (let i = 0; i < 10; i++) {
    //       stmt.run("Ipsum " + i);
    //   }
    //   stmt.finalize();
  
    //   // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    //   //     console.log(row.id + ": " + row.info);
    //   // });
    //   });
  
    // db.close();

    // Database copieeren vóór mangelen
    // FIXME: Dit is natuurlijk wel een beetje ranzig. Laten we daar een variabele van maken
    // Hoe zit die , {} constructie in elkaar?
    fs.copyFile('./myApp/database/bierendb.db', './myApp/database/'+studentnummer+'.db', (err) => {
      if (err) throw err;
      console.log('Database copied ')
    });


    res.render("index", { title: "Hey", message: "Gelukt!" });
  } else {
    res.render("index", { title: "Hey", message: "Mislukt!" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
