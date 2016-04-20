var express = require('express');
var route = express.Router();

route.get('/admin', function(req,res,next){
    res.send('<h1>Admin Panel</h1>');
});

module.exports = route;