'use strict'

const express = require('express');

const app = express();

const serverStatic = express.static;

app.use(serverStatic('build'));

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackMiddlewareConfig = require('./middleware.config.js');

const serverStat = serverStatic(webpackConfig.devServer.contentBase, {
  'index': ['index.html', 'index.htm']
});
//const app = express();

const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, webpackMiddlewareConfig);
app.use(middleware);



app.
    post('/', function (req, res){

      var body = '';

      var _end = 0;

      req.on('data', function(data){

        try {

          body += data;

          //console.log('leng ' + body.length);

          var bodyObj = JSON.parse(body);

          //console.log('pick ' + bodyObj.pick);
//minValidLength       jsonPickup.pick = 1;jsonPickup.minLengthTel

          console.log('pickup ' + bodyObj.pick);

              //console.log('phone ' + bodyObj.phone + bodyObj.phone.length);

              //console.log('addr ' + bodyObj.address + bodyObj.address.length);



          if ( bodyObj.pick === 0 ) {

            console.log('pick = 0 ' + bodyObj.pick);

              //console.log('phone ' + bodyObj.phone + bodyObj.phone.length);

              //console.log('addr ' + bodyObj.addressPic + bodyObj.address.length);

            if ( bodyObj.phone.length < 2 || bodyObj.address.length < 2 ) {

              console.log('phone ' + bodyObj.phone + bodyObj.phone.length);

              console.log('addr ' + bodyObj.address + bodyObj.address.length);

              throw new SyntaxError("Мало информации");

            }

          } else {
            console.log('pick ' + bodyObj.pick);
            if ( bodyObj.phone.length < 2 ) {

              console.log('pic ' + bodyObj.pick);

              throw new SyntaxError("Мало информации");

             }

          }


        } catch (e) {

          console.log('err ' + e);

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

          console.log('noerr' + _end);

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

