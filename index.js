const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors({
    origin: [
        "https://sushil-portfolio.surge.sh",
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruakr2a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        const tasksCollection = client.db('taskTracker').collection('tasks');
        // await client.connect();
        app.get('/tasks', async (req, res) => {
            try {
                const result = await tasksCollection.find().toArray();
                res.send(result)
            }
            catch (error) {
                console.log(error);
            }
        })
      
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("Server is Running Now.....")
})
app.listen(port, () => {
    console.log(`Server Running on port: ${port}`);
})