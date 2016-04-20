var express = require('express');
var route   = express.Router();

var data = require('../models/db');

route.get('/', function(req,res,next){
    //res.send('<h1>Welcome to my app!</h1>');
    res.render('home', {
        siteTitle: data.siteInfo.title,
        welcome: data.siteInfo.welcome_message,
        items: ['Lorem','ipsum', 'dolor sit amet', 'consectetur', 'adipisicing elit']
    });
});

module.exports = route;