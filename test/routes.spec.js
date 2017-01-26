process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server/server.js');

chai.use(chaiHttp);

describe('API Routes', function() {

});

describe('GET /api/folders', function() {
  it('should return all folders', function(done) {
    chai.request(server)
    .get('/api/folders')
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array');
    done();
    });
  });
});

describe('POST /api/folders', function() {
  it('should create a new folder', function(done) {
    let folder = {folderName:'Fun Times'}
    chai.request(server)
    .post('/api/folders')
    .send(folder)
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json; // jshint ignore:line
    res.body.should.be.a('array');
    done();
    });
  });
});

describe('GET /api/urls/:folder_id', function() {
it('should return urls associated with a folder', function(done) {
  chai.request(server)
  .get('/api/urls/1')
  .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array');
    done();
  });
});
});

describe('POST /api/urls', function() {
  it('should add a url', function(done) {
    let url = {actualurl:'www.google.com', clickCount: 0, shorturl: '8', folder_id:1}
    chai.request(server)
    .post('/api/urls')
    .send(url)
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json; // jshint ignore:line
    res.body.should.be.a('array');
    done();
    });
  });
});
