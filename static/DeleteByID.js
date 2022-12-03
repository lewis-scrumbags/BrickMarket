const { ObjectID } = require('bson');

const constants = require('./ConnectionConstants.js');
let MongoClient = require('mongodb').MongoClient;

async function deleteByID(uri, databaseName, collectionName, id) {
	const client = new MongoClient(uri);
	const result = await client.db(databaseName).collection(collectionName).deleteOne({"_id":ObjectID(`${id}`)});
    console.log(result);
	client.close()
}

// The first user parameter (argv[2]) must be the ObjectID to find.
if (process.argv[2] === undefined) {
	console.log('ObjectID Required')
} else {
	const objectID = process.argv[2]
	deleteByID(constants.uri, constants.databaseName, constants.collectionName, objectID);
}



