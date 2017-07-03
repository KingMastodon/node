
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var data = require('./cats.json');

app.listen(5300, function(){
  console.log('App listening on port 5300');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
// 2 подключения bodyParser, потому что предусматриваем 2 формата входных данных
//клиент должен указывать параметр в каком виде посылает: в header указывается url-encoded или application/json
// т.е "Content-Type": "application/json" или application/..../urlencoded
app.get('/cats', function(req, res){
  res.json(data);
});

//заходим на localhost:5300 - заполняем форму и вуа-ля!
app.post('/cats', function(req, res) { 
  console.log(req.body);
  var id = Number(req.body.id);
  var name = req.body.name;  
  var cat = { 
    id: id, 
    name: name 
  }; 
  data.push(cat); 
  res.json(data); 

  update();
});

function update() {
  fs.writeFile("./cats.json", JSON.stringify(data), function(err) {
      if (err) console.error(err);
      console.log("The file was saved!");
  }); 
}

//удаляем котов - localhost:5300/records/1, где 1 - id
//вариант 1
app.get('/cats/:id', function(req, res){ //DELETE
  try {
    var id = Number(req.params.id);
    console.log('Delete', id);
    var item = data.filter(function(item){
      return item.id == id;
    });
    data.splice(data.indexOf(item), 1);
    update();
    res.json(data);
  }
  catch(e) {
    res.statusCode = 500;
    res.send(e.message);
  }
});

//вариант 2
// app.get('/cats/:id', function(req, res){ //DELETE без проверки
//     var id = req.params.id;
//     deleteItem(id, function err() {
//       if (err) {
//         res.statusCode = 500;
//         res.send(err.message);
//       }
//       res.send(e.message);
//     })

// function deleteItem(id, callback){
//   try {
//     var item = data.filter(function(item){
//       return item.id == id;
//     });
//     data.splice(data.indexOf(item), 1);
//     res.send('ok');
//   //  res.json(subdata);
//   }
//   catch(e) {
//     callback(e);
//   }
// }
// });
