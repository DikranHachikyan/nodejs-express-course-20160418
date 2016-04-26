var express = require('express');
var route  = express.Router();
var db     = require('../models/db.js');

route.get('/',function(req,res,next){

    db.getCategories(function(categories){
        res.render('index', {'categories': categories});    
    });
    
});//home page*/


module.exports = route;