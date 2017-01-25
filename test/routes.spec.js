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
    res.should.be.json; // jshint ignore:line
    res.body.should.be.a('object');
    res.body.should.have.property(0);
    res.body.should.have.property(1);
    done();
    });
  });
  it('should return a single folder', function(done) {
    chai.request(server)
    .get('/api/folders/0')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('folder');
      done();
    });
  });
});
