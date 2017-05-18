var express = require('express');
var api_router = express.Router();
var constants = require('../constants');

module.exports = function (app,loginService) {
    // route middleware to verify a token
    api_router.use(function (req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.headers['x-access-token'];
        // decode token
        if (token) {
            loginService.verify(app,token,req,res,next);
/*
            if(result.success){
              req.decoded = result.decoded;
              next();
            } else {
              return res.send({
                  success: false,
                  message: 'Authentication failed'
              });

            } */
        } else {
            // if there is no token
            return res.status(403).send({
                success: false,
                message: constants['errorMessages']['MISSING_TOKEN']
            });
        }
    });
    app.use('/home', api_router);
}
