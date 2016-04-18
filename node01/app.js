//console.log('Hello Node.js');

var http = require('http');

var server = http.createServer(function(request,response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h1>Hello Node.js!</h1>');
    response.end();
});//create server

server.listen(3000, function(){
    var addr = server.address();
    console.log('Listen to port ' + addr.port +
                ' address ' + addr.address + 
                ' family  ' + addr.family );
});