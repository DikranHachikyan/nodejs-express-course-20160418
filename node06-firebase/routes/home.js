var express = require('express');
var route  = express.Router();
var db     = require('../models/db.js');

route.get('/',function(req,res,next){
	var user;
	db.isLoggedIn(function(authData){
		user = authData;
	});
    db.getCategories(function(categories){
        res.render('index', {'categories': categories, 'user': user});    
    });
    
});//home page*/


module.exports = route;