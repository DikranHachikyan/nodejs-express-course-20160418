var siteData = require('./images.json');

module.exports.info = {
    title : siteData.title,
    description : siteData.description
};

module.exports.getItems = function(){
    var items = [];
    siteData.items.forEach( function(item){
        items.push(item);
    });
    return items;
};