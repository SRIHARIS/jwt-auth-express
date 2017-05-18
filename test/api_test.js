//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var username = 'test';
var password = 'test123';
var validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiSm9obiAiLCJsYXN0TmFtZSI6IkRvZSIsImlhdCI6MTQ5NTA4ODQwOH0.nArPB-7ktD2eeCG1F0Rj9GAZztenUOZeTBRT4f7kjVo';
var invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiSm9obiAiLCJsYXN0TmFtZSI6IkRvZSIsImlhdCI6MTQ5NTA0MzM5MH0.GOYwTuuwXPkKlyuxLU1LeI0Yy63NfMs59qexBEDDNs'

chai.use(chaiHttp);
  /*
  * Login
  */
  describe('/POST login without params', function(){
      it('login without params', function(done){
        chai.request(server)
            .post('/login')
            .end((err, res) => {
                res.should.have.status(200);
                res.body['success'].should.be.eql(false);
              done();
            });
      });
  });

  describe('/POST login with valid credentials', function(){
      it('login with valid credentials', function(done){
        
        var payload = {
          username : username,
          password : password
        }

        chai.request(server)
            .post('/login')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body['success'].should.be.eql(true);
                res.body['userData']['id'].should.be.eql(1);
              done();
            });
      });
  });


  describe('/POST login with invalid credentials', function(){
      it('login with invalid credentials', function(done){
        
        var payload = {
          username : username,
          password : 'password'
        }

        chai.request(server)
            .post('/login')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body['success'].should.be.eql(false);
              done();
            });
      });
  });

  /*
  * Home
  */

  describe('/GET Home without token', function(){
      it('Home without token', function(done){

        chai.request(server)
            .get('/home')
            .end((err, res) => {
                res.should.have.status(403);
                res.body['success'].should.be.eql(false);
              done();
            });
      });
  });

  describe('/GET Home with invalid token', function(){
      it('Home with invalid token', function(done){

        chai.request(server)
            .get('/home')
            .set('x-access-token',invalidToken)
            .end((err, res) => {
                res.should.have.status(403);
                res.body['success'].should.be.eql(false);
              done();
            });
      });
  });

  describe('/GET Home with valid token', function(){
      it('Home with valid token', function(done){

        chai.request(server)
            .get('/home')
            .set('x-access-token',validToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body['success'].should.be.eql(true);
              done();
            });
      });
  });