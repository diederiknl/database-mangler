

const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://10.20.0.1:27017/Studenten";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }

    }
);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    // await client.db("Studenten").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("Studenten");
    const studenten = database.collection("Studenten");

    // Query for a movie that has the title 'The Room'
    const query = { voornaam: "Hamza" };

    // Execute query
    const movie = await studenten.findOne(query);
    console.log(movie.voornaam);



  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
