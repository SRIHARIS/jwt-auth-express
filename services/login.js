var jwt = require('jsonwebtoken');
var constants = require('../constants');

module.exports = {
    signIn : function (app,credentials) {

        if(credentials.username == "test" && credentials.password == "test123") {
            //Normally return from data source
            var userData = {
                id: 1,
                firstName: "John ",
                lastName: "Doe",
            };

            var token = jwt.sign(userData, app.get('secret'));

            return {
                success: true,
                userData : userData,
                token: token
            };
        } else {
            return {
                message : constants['errorMessages']['INVALID_CREDENTIALS'],
                success : false
            }
        }
    },
    verify : function( app,token,req,res,next) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('secret'), function (err, decoded) {
            if (err) {
              res.status(403).send({
                  success: false,
                  message: constants['errorMessages']['INVALID_TOKEN']
              });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }
}
