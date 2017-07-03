var http = require('http');
var fs = require('fs');
var content = fs.readFileSync('package.json');
console.log(content.toString());

// Загружаем модуль http
var http = require('http');

// Создаем web-сервер с обработчиком запросов
var server = http.createServer(function (req, res) {
    console.log('Начало обработки запроса');
    // Передаем код ответа и http-заголовки
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=UTF-8'
    });
    res.end(content.toString());
});

// Запускаем web-сервер
server.listen(3000, "127.0.0.1", function () {
    console.log('Сервер запущен http://127.0.0.1:3000/');
});