// Bieren van Chimay aanpassen qua promillage

// 1085504

// 4072
// 4073
// 4248
// 4702

// INPUT: Studentnummer (to get the path to the database)
// OUTPUT: None

const sqlite3 = require ('sqlite3');

// Main Function
function adjust_alcohol(studentnummer) {
    const db = `myapp/public/${studentnummer}.db`
    console.log(db);

}
// Open

