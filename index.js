const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bwrtzwz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const postCollection = client.db("socialMedia").collection("post");

    app.get('/post', async(req, res)=> {
     const query = {};
     const result = await postCollection.find(query).toArray();
     res.send(result);
    })
   
  } finally {
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('social media server is running')
  });

  app.listen(port, () => {
    console.log(`social media server running on port ${port}`)
  })