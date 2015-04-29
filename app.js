var express = require( 'express' );
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes/');


// initialize app
var app = express();

app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

app.set('view engine', 'html');
app.set('views', __dirname + '/views/');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.listen(3000);
app.use('/', routes);


// Data
var pplArr = [{name: 'John'}, {name: 'Jane'}, {name: 'Joe'}];
var siteData = {title: 'Hall of Fame', people: pplArr};

// app functionality

/*app.get('/', function(request, response) {
	console.log("server listening");
	response.render('index', siteData);
});*/

