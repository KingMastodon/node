
 
var http = require('http');
var server = http.createServer(); 
/*
setInterval(function() {
		var time = Date.now();
		var date = new Date(time);
		var datestring = date.toString();
		console.log(datestring);
		
}, 1000);

*/
server.on('request', function (request, response) {
	console.log('request event');
	response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
	
	function getTime(){
		var time = Date.now();
		var date = new Date(time);
		var datestring = date.toString();
		console.log(datestring);
		response.end('<h1>var a = '+ datestring +';</h1>');
	};
	
	setInterval(getTime, 1000);

	
	

	

});
server.on('connection', function() {   
	console.log('connection event'); 
});
server.listen(8124, function() {
   console.log('listening event');
   
   
   
});
console.log('Server running on port 8124');