var Firebase = require('firebase');
var _ = require('lodash');

var ref = new Firebase('https://mushop.firebaseio.com/');

var catsRef = ref.child('categories');
var collsRef = ref.child('collections');


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