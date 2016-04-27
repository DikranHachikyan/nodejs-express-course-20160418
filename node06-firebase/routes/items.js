var express = require('express');
var route   = express.Router();
var db = require('../models/db.js');

route.get('/category/:catid/items', function(req,res,next){
	var ctid = req.params.catid;

	db.getItems(ctid, function(items){
		res.render('index', {'category': ctid,'items':items});	
	});
	
});// show items in category

module.exports = route;