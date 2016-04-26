var Firebase = require('firebase');
var _ = require('lodash');

var ref = new Firebase('https://mushop.firebaseio.com/');

var catsRef = ref.child('categories');
var collsRef = ref.child('collections');

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