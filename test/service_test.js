var chai = require('chai');
var server = require('../app');
var loginService = require('../services/login');
var should = chai.should();

var username = 'test';
var password = 'test123';

describe('Sign in', function(){
    it('Sign in', function(done){
      var credentials = {
        username : username,
        password : password
      }
      var result = loginService.signIn(server,credentials);
      result.success.should.be.eql(true)
      done();
    });
});
