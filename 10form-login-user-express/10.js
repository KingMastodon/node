var express = require("express"); 
var app = express();
var bodyParser = require("body-parser");
 var data = require('./data.json');
 var fs = require('fs');
 var session = require('express-session')
// создаем парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false}); //распарсиваем url
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }})); //подключаем сессию
 app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));
 
app.post("/form", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
	response.send(`${request.body.id} - ${request.body.name}`);
	var id = request.body.id;
	var name = request.body.name;
	var message = request.body.message;
	
	var result = {
		id: id,
		name: name,
		message: message
	};
	 data.push(result); 
	for (i in data){
		if (id==data[i].id && name==data[i].name){
		console.log(data[i].id);
		}
	}
	
	 
	
});
 
app.get("/", function(request, response){
	show = [];
	for(i in data){
		var name = data[i].name.toString();
		 show.push(name); 
	}
	
	//response.end(show.toString());
	
	var sess = request.session;
		
	if (sess.views) {
		sess.views++;
		response.write('<p>views: ' + sess.views + '</p>');
		response.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
		response.end();
	}else {
		sess.views = 1;
		response.end('welcome to the session demo. refresh!');
	}
 
			
});

app.get('/data/:id', function(request, response){ //DELETE localhost:8124/data/8
  try {
    var id = Number(request.params.id);
    console.log('Delete', id);
    var item = data.filter(function(item){
      return item.id == id;
    });
    data.splice(data.indexOf(item), 1);
    
	 fs.writeFile("./data.json", JSON.stringify(data), function(err) {
      if (err) throw err; 
      console.log("The file was saved!");
	}); 
    response.json(data);
  }
  catch(e) {
    response.statusCode = 500;
	response.send(e.message);
  }
});
 
app.listen(8124);