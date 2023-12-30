//let IntStudentnummer = "1006936";

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

async function getStudentFirstName(IntStudentnummer) {
  try {
    // Rammen met die client!

    await client.connect();

    const database = client.db("Studenten");
    const studenten = database.collection("Studenten");

    const query = { studentnummer: + IntStudentnummer };

    // Execute query
    const student = await studenten.findOne(query);

    //console.log(await student)
    return Promise.resolve(student.voornaam)




  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

getStudentFirstName(1006936).then(console.log)
