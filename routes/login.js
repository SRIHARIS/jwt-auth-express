var constants = require('../constants');

module.exports = function(app,loginService) {
    app.post('/login',function(req,res) {

        var response = {};

        var credentials = {
            username: req.body.username || '',
            password: req.body.password || ''
        };

        if(credentials.username == '' || credentials.password == '') {
            response = {
                message : constants['errorMessages']['MISSING_CREDENTIALS'],
                success : false
            }
        } else {
            response = loginService.signIn(app,credentials);
        }
        return res.send(response);
    })
}
