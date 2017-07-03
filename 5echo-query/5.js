
 
var http = require('http');
var server = http.createServer(); 
var url = require('url'); //спец модуль для разбора переданной строки запроса
server.on('request', function (request, response) {
	console.log('request event');
	response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
	
	console.log(request.method, request.url) ;
	
	var urlParsed = url.parse(request.url, true); //разбор строки query в объект
	console.log(urlParsed);
	
	if(urlParsed.pathname == '/echo' && urlParsed.query.message){ //ввоодить echo?message=Hello
		response.end(urlParsed.query.message); 
	} else {
		response.statusCode = 404;
		response.end("page not found");
	}
	
	
	

	

});
server.on('connection', function() {   
	console.log('connection event'); 
});
server.listen(8124, function() {
   console.log('listening event');
   
   
   
});
console.log('Server running on port 8124');