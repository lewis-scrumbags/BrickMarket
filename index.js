const express = require('express')
app = express()
var url = require('url');
const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require('./static/user');
const Element = require('./static/Create')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//MongoDB username cluster : BrickMarketUser
//MongoDB cluster password: BrickMarketPassword
const uri = "mongodb+srv://BrickMarketUser:BrickMarketPassword@cluster0.feqkxqj.mongodb.net/?retryWrites=true&w=majority"	
const databaseName = "BrickMarketDatabase"
const collectionName = "test"

module.exports = { uri, databaseName, collectionName };

const SECRET_TOKEN = 'asdfalkef2434543efasdgerhjv>,-om-o#*_($(*Efemoefgjf'
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// const { stringify } = require('querystring');
app.use(bodyParser.json())

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))


// The app.get functions below are being processed in Node.js running on the server.
// Implement a custom About page.

app.post('/create', async (request, response) =>{	
	const newElement = await Element.create({
		itemID: request.body.itemID,
		designID: request.body.designID, 
		description: request.body.description, 
		color: request.body.color, 
		colorID:  request.body.colorID, 
		quantity: request.body.quantity
	})
})

app.post('/login', async (request, response) => {
	console.log(request.body);
	const username = request.body.username;
	const password = request.body.password;
	const user =  await User.findOne({username, password}).lean()
	if (!user){
		return response.json({status: 'error', error: 'Invalid username or password'})
	}
	if (await bcrypt.compare(password, user.password)){		//Checks username password combination

		const token = jwt.sign(
			{
			id: user._id, 
			username: user.username
			},
			SECRET_TOKEN
		)

		return res.json({status: 'Successful', data: token})
	} 


	response.json({status: 'error', error:'Invalid username or password'});
})
app.post('/register', async (request, response) => {
	console.log(request.body);
	const username = request.body.registerUsername;
	const email = request.body.registerEmail;
	const registerPassword = request.body.registerPassword;
	//username and password requirements
	if(!username || typeof username !== 'string'){
		return response.json({status: 'error', error: 'Invalid Username'})
	}
	if(!registerPassword || typeof registerPassword !== 'string'){
		return response.json({status: 'error', error: 'Invalid Username'})
	}
	if(registerPassword.length < 9){
		return response.json({status: 'error', error: 'Password must be at least 8 characters long'})
	}
	const password = await bcrypt.hash(registerPassword, 10)
	try{
		const res = await User.create({
			username,
			password,
			email
		})
		console.log("User created: ", res)
	}catch(error){
		//11000 is the error for duplicate key. Use console.log(JSON.stringify(error)) and run to see error code
		if(error.code==11000){
			 return response.json({status: 'error', error: 'Username already exists'})
			
		}
		throw error
	}
	response.json({status: 'Successful'})
})

app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('About Node.js on Azure Template.')
})

app.get('/version', (request, response) => {
	console.log('Calling "/version" on the Node.js server.')
	response.type('text/plain')
	let x = parseInt(inputs.x)
	let y = parseInt(inputs.y)
	let sum = x + y
	response.type('text/plain')
	response.send(sum.toString())
})


// Test a variety of functions.
app.get('/test', (request, response) => {
    // Write the request to the log. 
    console.log(request);

    // Return HTML.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Testing Function</h3>')

    // Access function from a separate JavaScript module.
    response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");

    // Show the full url from the request. 
    response.write("req.url="+request.url+"<br><br>");

    // Suggest adding something tl the url so that we can parse it. 
    response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
    
	// Parse the query string for values that are being passed on the URL.
	var q = url.parse(request.url, true).query;
    var txt = q.year + " " + q.month;
    response.write("txt="+txt);

    // Close the response
    response.end('<h3>The End.</h3>');
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)