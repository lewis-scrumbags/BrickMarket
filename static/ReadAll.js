const constants = require('./ConnectionConstants.js');

function readAll(uri, databaseName, collectionName) {
	try {
		let MongoClient = require('mongodb').MongoClient;
		MongoClient.connect(uri, 
			function(err,db) {
				if (err) throw err;
				let dbo = db.db(databaseName);
				dbo.collection(collectionName).find({}).toArray(
					function(err, result) {
						if (err) throw err;
						result.forEach(function(item){console.log("Title: "+item.title+"\nID: "+item._id+"\n")})
						console.log(result.length+" documents")
						db.close();
					}
				)
			}
		)
	} catch(e) {
		console.log(e)
	}
}

readAll(constants.uri, constants.databaseName, constants.collectionName);
