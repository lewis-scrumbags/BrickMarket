let MongoClient = require('mongodb').MongoClient;
const constants = require('./ConnectionConstants.js');
const { ObjectID } = require('bson');

async function readOne(uri, databaseName, collectionName) {
	const client = new MongoClient(uri);
	const result = await client.db(databaseName).collection(collectionName).findOne({"_id":ObjectID("62a22ef688f0e15b9d2d80f6")});
    console.log(result);
	client.close()	
}

readOne(constants.uri, constants.databaseName, constants.collectionName);

