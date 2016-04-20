var express = require('express');
var route   = express.Router();

route.get('/about',function(req,res,next){
    res.send('<h1>About Us</h1>');
});

module.exports = route;