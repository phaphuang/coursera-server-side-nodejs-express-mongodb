const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017';

// MongoClient.connect(url, (err, db) => {
MongoClient.connect(url, (err, client) => {
    const db = client.db('conFusion');

    assert.equal(err,null);

    console.log('Connected correctly to server');

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);

        dboper.findDocument(db, "dishes", (docs) =>{
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test"}, "dishes", (result) => {
                console.log("Updated Document:\n", result.result);

                dboper.findDocument(db, "dishes", (docs) =>{
                    console.log("Found Updated Documents:\n", docs);

                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);
                        
                        client.close();
                    });
                });
            });
        });
    });

});