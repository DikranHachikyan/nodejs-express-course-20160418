var express = require('express');
var route  = express.Router();

var db = require('../models/db.js');

route.get('/', function(req,res,next){
    res.render('index', {
        site : db.info,
        items: db.getItems()
    });
}); //home page

module.exports = route;