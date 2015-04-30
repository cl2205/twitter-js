var express = require('express');
var path = require('path');
var parser = require('body-parser');
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

	var router = express.Router();
	var urlencoded = parser.urlencoded({extended: false});
	var jsonParser = parser.json();

////////////////
module.exports = function (io) {


	router.get('/', function (req, res) {
	  var tweetsArray = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweetsArray, showForm: true } );

	});

	router.get('/public/marshmellow-kitten.jpg', function(req, res) {
		var htmlPath = path.join(__dirname, "../public/marshmellow-kitten.jpg");
		//var htmlPath = '/public/marshmellow-kitten.jpg';
		res.sendFile(htmlPath);
	});

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  var list = tweetBank.find( {name: name} );
	  res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: list, showForm: true, userName: name } );
	});

	router.get('/users/:name/tweets/:id', function(req, res) {
		var name = req.params.name;
		var tweetID = Number(req.params.id);
		var list = tweetBank.find({id: tweetID});
		res.render('index', { title: 'Twitter.js - Posts by '+ name, tweets: list });
	});

	router.post('/submit', urlencoded, function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  tweetBank.add(name, text);
	  io.sockets.emit('new_tweet', {name: name, text: text});
	  res.redirect('/');

	});


	return router;
};
// module.exports = router;




