const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const userCollection = client.db("socialMedia").collection("users");

    app.get('/post', async(req, res)=> {
     const query = {};
     const result = (await postCollection.find(query).toArray()).reverse();
     res.send(result);
    });

    app.get('/users', async(req, res)=> {
     const query = {};
     const result = await userCollection.find(query).toArray();
     res.send(result);
    });

    app.get('/post/:id', async(req, res)=> {
     const id = req.params.id;
     const query = {_id: new ObjectId(id)};
     const result = await postCollection.findOne(query);
     res.send(result);   
    });

    app.post('/users', async(req, res)=> {
     const user = req.body;
     const result = await userCollection.insertOne(user);
     res.send(result);   
    });

    app.put('/users/:id', async(req, res)=> {
      const id = req.params.id;
      const user = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: user.name,
          university: user.university,
          email: user.email,
          address: user.address 
        },
      }
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    app.post('/post', async(req, res)=> {
     const post = req.body;
     const result = await postCollection.insertOne(post);
     res.send(result);   
    });
   
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