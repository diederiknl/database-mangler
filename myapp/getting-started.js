const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://10.20.0.1:27017/Studenten";
const client = new MongoClient(uri,  {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }

    }
);

export async function getStudentFirstName(IntStudentnummer) {
  // We krijgen IntStudentnummer. Is dit een nummer?
  if (isNaN(IntStudentnummer)) {
    throw new Error("IntStudentnummer is not a number");
  }
  try {
    // Bouw de verbinding
    await client.connect();
    // Verbind met de Studenten-Databases
    const database = client.db("Studenten");
    // Selecteer de juiste collectie
    const studenten = database.collection("Studenten");
    // Bouw de query
    const query = { studentnummer: + IntStudentnummer };
    // Vuur de query
    const student = await studenten.findOne(query);
    // Indien student bestaat:
    if (!student) {
      return("NOSTUDENT")
    }
    else {
      return(student.voornaam)
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//getStudentFirstName(IntStudentnummer).then(console.log)
