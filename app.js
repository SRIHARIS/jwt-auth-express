var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var port = process.env.PORT || 3000;
var app = express();
var loginService = require('./services/login');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('secret', 'alpha-0805');

//Include routes
require('./util/auth')(app,loginService);
require('./routes/login')(app,loginService);
require('./routes/home')(app);

var server = app.listen(port);
module.exports = app;
