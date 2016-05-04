var Firebase = require('firebase');
var _ = require('lodash');

var ref = new Firebase('https://mushop.firebaseio.com/');

var catsRef = ref.child('categories');
var collsRef = ref.child('collections');

//---------- User login ---------------------------------
var loginWithEmail = module.exports.loginWithEmail = function (user, onsuccess, onerror){
	ref.authWithPassword({
		'email': user.email,
		'password' : user.password
	},
	function(error,authData){
		var msg = 'Login failed!'
		if( error)
		{
			onerror(error,msg);	
		}	
		else //всичко е Ок
		{
			var userRef = ref.child('users').child(authData.uid);
			userRef.on('value', function(snap){
				onsuccess(snap.val());
			});

		}
	},
	{
		'remember': 'sessionOnly'
	});
};

//---------- Add New User -------------------------------
module.exports.addUser = function(user, onsuccess, onerror){
		ref.createUser({
			'email': user.email,
			'password': user.password
		}, function(error, authData){
			if( error )
			{
				var msg = 'Error creating user!';
				switch( error.code )
				{
					case 'EMAIL_TAKEN'  : msg = 'The email address ' + user.email + ' is already used';
										  break;
					case 'INVALID_EMAIL': msg = 'Invalid e-mail address ' + user.email;
										  break;
				}
				onerror(error,msg);
			}
			else
			{
				var currentUser = {
					'uid': authData.uid,
					'firstname': user.firstname,
					'lastname': user.lastname,
					'date': Firebase.ServerValue.TIMESTAMP,
					'email': user.email
				};
				var userRef = ref.child('users').child(authData.uid);
				userRef.set(currentUser);
				loginWithEmail({
					'email': user.email,
					'password':user.password
				}, function(cuser){
					onsuccess(cuser);
					console.log('----Loggedin----:', cuser);
				},
				  function(error,msg){
				  	onerror(error,msg);
				  	console.log('----Login error----:', error);
				});

				
			}
		});// create a new user
}; //add new user
//--------- Return Items in Category --------------------
module.exports.getItems = function(catid, itemscallback ){
	var itemsRef = collsRef.child(catid);
	var items = [];

	itemsRef.on('value', function(snap){
		_.forEach( snap.val() , function(value){
			items.push(value);
		});//conver object into array
		itemscallback(items);
	});//retrieve items
};// Return Items in Category

//--------- Get Categories  -------------------------
module.exports.getCategories = function(catcallback){
    var categories = [];
    catsRef.on('value', function(snap){
        
        _.forEach(snap.val(), function(value,key){
            value.id = key;
            categories.push(value);
        }); //for each category
        catcallback( categories );

    });//read categories from db
    
};