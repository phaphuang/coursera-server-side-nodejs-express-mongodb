const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

// MongoClient.connect(url, (err, db) => {
MongoClient.connect(url, (err, client) => {
    const db = client.db('conFusion');

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const collection = db.collection("dishes");
    collection.insertOne({"name": "Uthappizza", "description": "test"}, (err, result) => {
        assert.equal(err, null);

        console.log("After Insert:\n");
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err, null);

                client.close();
            });
        });
    });

});