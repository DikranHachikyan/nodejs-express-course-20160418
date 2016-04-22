var express = require('express');
var app = express();

var route = require('./routes');

app.set('view engine','ejs');

app.use('/images-lg', express.static('./public/pics-large'));
app.use('/images-sm', express.static('./public/pics-small'));
app.use('/css', express.static('./node_modules/bootstrap/dist/css'));

app.use('/fonts', express.static('./node_modules/bootstrap/dist/fonts'));

app.use('/js', express.static('./node_modules/bootstrap/dist/js'));
app.use('/js', express.static('./node_modules/jquery/dist'));



app.use(route.index);

var server = app.listen(3000, function(){
    console.log('Listening on port 3000 ...');
});