let MongoClient = require('mongodb').MongoClient;
const constants = require('./ConnectionConstants.js');

async function create(uri, databaseName, collectionName, title) {
	const client = new MongoClient(uri);
	const result = await client.db(databaseName).collection(collectionName).insertOne({"title":`${title}`});
	console.log(result);
	client.close();
}

// The first user parameter (argv[2]) must be the Title to create/insert.
if (process.argv[2] === undefined) {
	console.log('Title Required')
} else {
	create(constants.uri, constants.databaseName, constants.collectionName, process.argv[2] /* Title */);
}



