var app = require('../../app');
var should = require('chai').should();
var request = require('supertest');
var sampledata = require('../sampledata');
var mongoose = require('mongoose');
var LaunchUser = mongoose.model('LaunchUser');

before(function(done) {
    request = request('http://localhost:3000');
    LaunchUser.remove({}, function(err) {
    	done();
    })
});

describe('Testing LaunchUser API', function() {

	it('should be able to create a new launch user', function(done) {
		request
			.post('/api/v1/launch/users')
			.send(sampledata.sampleLaunchUser)
			.end(function(err,res) {
				res.status.should.equal(200);
				res.body.status.should.equal('success');
				done();
			});
	});

	it('should not be able to create a bad launch user', function(done) {
		request
			.post('/api/v1/launch/users')
			.send({'email':''})
			.end(function(err,res) {
				res.status.should.equal(400);
				res.body.status.should.equal('error');
				done();
			});
	});		
});
