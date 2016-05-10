var express = require('express');
var route  = express.Router();
var db     = require('../models/db.js');
var conf   = require('../config/'); 

var session = require('express-session');
var FirebaseStore = require('connect-firebase')(session);

var options = {
	host: conf.FB_HOST,
	token: db.token,
	reapInterval: 60000
}
route.use( db.connect);

route.use(session({
	store: new FirebaseStore(options),
	secret: 'online session',
	cookie: {path:'/', httpOnly:true, maxAge: 60000},
	unset: 'destroy',
	resave:true,
	saveUninitialized: false
}));//session

route.get('/',function(req,res,next){

	var session = req.session;
	if( session.isLoggedin)
	{
		db.getCategories(function(categories){
        	res.render('index', {'categories': categories, 'user': 'Visitor'});    
    	});	
	}
    else
    {
    	res.redirect('/user/login');
    }
    
});//home page*/


module.exports = route;