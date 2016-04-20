var express = require('express');
var app = express();
var message = 'Default Message';

app.get('/', function(req, res, next){
     console.log('first root function');
     message = '<h1>Welcome to my app!</h1>';
     next();
});

app.get('/', function(req, res, next){
    res.send(message);
    next();
});

app.get('/about', function(req,res,next){
    res.send('<h1>About us</h1>');
});

app.get('/user/:username', function(req,res,next){
    var uname = req.params.username;
    
    res.send('<h1>Hello '+uname+'</h1>');
});

app.get('/user/:username/mail/:email', function(req,res,next){
    var uname = req.params.username;
    var email = req.params.email;
    res.send('<a href="mailto:'+email+'">Contact '+uname+'</a>');
});



app.get('*', function(req,res,next){
    res.send('<h1>Bad Request</h1>');
});

var server = app.listen(3000, function(){
    console.log('Listening on port 3000 ...');
});