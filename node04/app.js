var express = require('express');
var app = express();

var route = require('./routes');

app.set('view engine','ejs');
//app.set('views', __dirname + '/myviews');

//console.log('dirname:' , __dirname);
//console.log('filename:', __filename);

app.use(route.index);
app.use(route.about);
app.use(route.admin);

var server = app.listen(3000, function(){
    console.log('Listening on port 3000 ...');
});
