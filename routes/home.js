
module.exports = function (app) {
    app.get('/home',function(req,res){
        var userInfo = req.decoded;
        var response = {
            message : "Hello " + userInfo.firstName + userInfo.lastName,
            success : true
        };

        res.send(response);
    });
}
