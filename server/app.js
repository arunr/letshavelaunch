// Pull in the libraries
var express = require('express');
var mongoose = require('mongoose');
var _ = require('underscore');
var Schema = mongoose.Schema;

// Settings for the app
var settings = {
	'static' 	: '/../web/',
	'db' 		: 'mongodb://localhost/launch'	
}

// Initialize & configure the app
var app = express();
app.configure(function() {
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + settings.static));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(app.router);			
});

// Connect to the database
mongoose.connect(settings.db)

// Set up the schema for storing the information we want to collect
var LaunchUserSchema = new Schema({
	email: {type: String, trim: true, required:true, unique:true},
	created_at : {type: Date, default: Date.now},
});
var LaunchUser = mongoose.model('LaunchUser', LaunchUserSchema);

// Handle the incoming request to create a new user
app.post('/api/v1/launch/users', function(req,res) {
	var created_email = {};
	created_email = _.extend(created_email, req.body);

	var launchUser = new LaunchUser(created_email);
	launchUser.save(function(err) {
		if (err) {
			res.send(400, {	'status': 'error',
						'message': 'Error saving launch user',
						'info': JSON.stringify(err)
			});
		} else {
			res.send(200, {	'status': 'success',
						'message': 'Saved launch user',
						'info': ''
			});
		}				
	})
});

// Handle any other routes - the default case
app.use(function (req,res){
	res.end('404 - Page not found');
});

// Start the server
app.listen(3000);
console.log('Started the landing page at port 3000');