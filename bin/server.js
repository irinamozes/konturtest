'use strict'

var express = require('express');

//const webpack = require('webpack');
//const webpackConfig = require('./webpack.config');

var app = express();

const serverStatic = express.static;

app.use(serverStatic('build'));

const serverStat = serverStatic('build', {
  'index': ['index.html', 'index.htm']
});

//const compiler = webpack(webpackConfig);
//const middleware = webpackMiddleware(compiler, webpackMiddlewareConfig);
//app.use(compiler);



app.
    post('/', function (req, res){

      var body = '';

      var _end = 0; 

      req.on('data', function(data){

        try {

          body += data;

          console.log(body.length);

          var bodyObj = JSON.parse(body); 

          if ( bodyObj.phone.length <2 || bodyObj.address.length <2  ) {

            throw new SyntaxError("Мало информации");

          }

        } catch (e) {

          console.log(e);

          _end = 1;

          if (e.message === "Мало информации") {

            res.status(400).send("Ошибка: Вы ввели слишком мало информации. Заявка не принята. Попробуйте снова."); 

          } else {

            res.status(500).send("Произошла непредвиденная ошибка. Заявка не принята. Попробуйте снова."); 

          }
        
        } 

      });    

      req.on('end', function(){

        if (_end === 0) { 

          console.log(_end);

          res.writeHead(200, {

            'Cache-Control': 'no-cache'

          }); 

        } 

        res.end("Заявка принята");

      });    


    }).
    get('/', serverStat);

app.listen(8080);

console.log(' Сервер запущен на порту 8080. Откройте http://localhost:8080/ у себя в браузере. Чтобы остановить сервер, нажмите Ctrl+C');

