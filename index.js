const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())


const uri = "mongodb+srv://faysal:dVbVMUinLS2bbGx@cluster0.rxpk4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const detailsCollection = client.db('personal-portfolio').collection('projectDetails');

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await detailsCollection.findOne(query);
            res.send(result)
        })
        app.get('/project', async (req, res) => {
            const query = {};
            const result = await detailsCollection.find(query).toArray();
            res.send(result)
        })
    }
    finally {
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('hello world ')
});

app.listen(port, () => {
    console.log('example app listening port  ', port);
})