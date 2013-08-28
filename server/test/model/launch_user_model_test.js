var app = require('../../app');
var should = require('chai').should();
var request = require('supertest');
var mongoose = require('mongoose');
var LaunchUser = mongoose.model('LaunchUser');
var sampledata = require('../sampledata');

before(function(done) {
	LaunchUser.remove({}, function(err) {
		done();
	})
});

describe("Launch User Schema:", function() {

	it("should have an email", function(done) {
		LaunchUser.schema.path('email').should.exist;
		done();
	});

	it("should have a created at timestamp", function(done) {
		LaunchUser.schema.path('created_at').should.exist;
		done();
	});
});

describe("Launch User Validations:", function() {
	describe("Testing the email: An email", function() {
        	it("should not be empty", function(done) {
			var launchUser = new LaunchUser(sampledata.sampleLaunchUser);
			launchUser.set('email', ' ');
			launchUser.save(function(err){
				err.should.exist;
				err.message.should.equal('Validation failed');
				done();
			});
	        });			
	})
});

