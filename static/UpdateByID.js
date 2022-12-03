const { ObjectID } = require('bson');

const constants = require('./ConnectionConstants.js');
let MongoClient = require('mongodb').MongoClient;

async function updateByID(uri, databaseName, collectionName, id, title) {
	const client = new MongoClient(uri);
	const result = await client.db(databaseName).collection(collectionName).updateOne({"_id":ObjectID(`${id}`)},{$set:{"title":`"${title}"`}});
    console.log(result);
	client.close();
}

// The first user parameter (argv[2]) must be the ObjectID to update and the second parameter (argv[3]) must by the new title.
if (process.argv[3] === undefined) {
	console.log('ObjectID and New Title Required')
} else {
	const objectID = process.argv[2];
	const title = process.argv[3];
	updateByID(constants.uri, constants.databaseName, constants.collectionName, objectID, title);
}



