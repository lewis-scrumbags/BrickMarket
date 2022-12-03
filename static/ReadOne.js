let MongoClient = require('mongodb').MongoClient;
const constants = require('./ConnectionConstants.js');
const { ObjectID } = require('bson');

async function readOne(uri, databaseName, collectionName) {
	const client = new MongoClient(uri);
	const result = await client.db(databaseName).collection(collectionName).findOne({"_id":ObjectID("638adf34464e41a829e89142")});
    console.log(result);
	client.close()	
}

readOne(constants.uri, constants.databaseName, constants.collectionName);

