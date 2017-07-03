
var fs = require('fs'); 
//var parsedJSON = require('data.json');
var url = require('url');
var http = require('http');
var server = http.createServer(); 




server.on('request', function (request, response) {
	console.log('request event');
	response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
	
	console.log(request.method, request.url) ;
	
		
	
	fs.readFile('data.json', 'utf8', function (err, data) {
		if (err) throw err; // we'll not consider error handling for now
		var obj = JSON.parse(data);
		var urlParsed = url.parse(request.url, true); //разбор строки query в объект
		var count = obj.length;
		//var count_to_show = 3 //количество отображаемых элементов
		
		if(urlParsed.pathname == '/echo' && urlParsed.query.page<=count){ //ввоодить echo?page=1		
			var offset=urlParsed.query.page;
			if (err) throw err; 
				
				
			var resultId = obj[offset-1].id.toString();
			var resultName = obj[offset-1].name.toString();
			var resultMessage = obj[offset-1].message.toString();
			var result= 'id: '+resultId+ '<br>name: ' +resultName;
			console.log(result);
			response.end(result); 

				
		} else {
			response.statusCode = 404;
			response.end("page not found");
		}	
	
		console.log(obj.length);
	

	});

});
server.on('connection', function() {   
	console.log('connection event'); 
});
server.listen(8124, function() {
   console.log('listening event');
   
   
   
});
console.log('Server running on port 8124');


