const uri = "[[YOUR-CONNECTION-STRING-HERE]]"	
// Example uri:
// const uri = "mongodb+srv://testMongoDBUserName:8L4kkR8KszHZTI7S@cluster0.fei8p8f.mongodb.net/?retryWrites=true&w=majority"	

const databaseName = "movieDatabase"
const collectionName = "movies"

module.exports = { uri, databaseName, collectionName };
