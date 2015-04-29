var express = require( 'express' );
var morgan = require('morgan');

// initialize app
var app = express();

app.use(morgan('dev'));

app.get('/', function(request, response) {
	console.log("server listening");
	response.send("working");
});

app.listen(3000);