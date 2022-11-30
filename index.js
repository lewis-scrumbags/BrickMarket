const express = require('express')
app = express()

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2
const bodyParser = require("body-parser");
// const { stringify } = require('querystring');
app.use(bodyParser.json())

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))


// const element = {
// 	loginUsername: String,
// 	loginPassword: String,
// 	registerUsername: string,
// 	registerPassword: String,
// 	registerEmail: String
// }

// The app.get functions below are being processed in Node.js running on the server.
// Implement a custom About page.
app.post('/login', function(request, response){
	console.log(request.body);
	let login = request.body.username;
	let password = request.body.password;
	let confirm = login + password;
	const responseText = JSON.stringify(confirm);
	response.json(responseText);
	console.log(responseText);
})
app.post('/register', function(request, response){
	console.log(request.body);
	let registerUsername = request.body.registerUsername;
	let registerEmail = request.body.registerEmail;
	let registerPassword = request.body.registerPassword;
	let finalAnswer = registerUsername + registerPassword + registerEmail;
	const loginPasswordEmail = JSON.stringify(finalAnswer);
	response.json(loginPasswordEmail);
	console.log(loginPasswordEmail);
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
