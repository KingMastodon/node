var testFolder = './public/';
var fs = require('fs');


 
var http = require('http');
var server = http.createServer(); 
var url = require('url'); //спец модуль для разбора переданной строки запроса
server.on('request', function (request, response) {
	console.log('request event');
	response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
	
	fs.readdir(testFolder, function(err, files){
		var array = files.toString().split("/n");
		for(i in array) {	
		console.log(array[i]);
		}
		files.forEach(function(file){
		console.log(file);
		});
		response.end(array.toString());
	})
		
		

});
server.on('connection', function() {   
	console.log('connection event'); 
});
server.listen(8124, function() {
   console.log('listening event');
   
   
   
});
console.log('Server running on port 8124');