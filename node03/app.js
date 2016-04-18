var express = require('express');
var app = express();

app.get('/', function(req, res, next){
    res.send('<h1>Hello Node.js and Express!</h1>');
});

var server = app.listen(3000, function(){
    console.log('Listening on port 3000 ...');
});