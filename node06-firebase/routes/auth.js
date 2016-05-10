var express = require('express');
var route   = express.Router();
var multer  = require('multer');
var jwt     = require('jwt-simple');
var conf    = require('../config/');  
var db  = require('../models/db.js');


route.get('/user/registration/', function(req,res,next){
	res.render('user-login-registration',{'ui':'register'});
});//show registration form

route.get('/user/login/', function(req,res,next){
	res.render('user-login-registration',{'ui':'login'});
});//show registration form

route.use( multer().array() );

//----------------- Login with Password & E-Mail ---------------
route.post('/user/try-login', function(req,res,next){
	var session = req.session;
	var token   = req.body.token;

	console.log('token:' , jwt.decode(token, conf.FB_SECRET ));
	session.isLoggedin = true;	
	res.send({redirect: '/'});

});


//----------------- Create New User and Login --------------------
route.post('/user/save', function(req,res,next){
	var  user = { 'firstname' : req.body.firstname,
				  'lastname'  : req.body.lastname,
		 		  'password'  : req.body.password,
		 		  'email' 	  : req.body.email
		 		};
	//console.log(req.body);
	if( user.password && user.email )
	{
		db.addUser( user , 
					function(currentUser){
						res.redirect('/');
					}, //on success
					function(error, msg){
						res.render('error-page', {'error_message' : msg});		
					}//on error
					);//save to database 
	}
	else
	{
		res.redirect('/user/registration/');
	}
});// save user data

module.exports = route;