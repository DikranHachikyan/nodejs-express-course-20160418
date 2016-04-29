var express = require('express');
var route   = express.Router();
var multer  = require('multer');

var db  = require('../models/db.js');


route.get('/user/registration/', function(req,res,next){
	res.render('user-login-registration');
});//show registration form

route.use( multer().array() );

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
						res.redirect('/?firstname=' + currentUser.firstname);
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