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

const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, webpackMiddlewareConfig);
app.use(middleware);

app
  .post('/', function(req, res) {
    var body = '';

    req.on('data', function(data) {
      try {
        body += data;

        var bodyObj = JSON.parse(body);

        if (bodyObj.pick === 0) {
          if (bodyObj.phone.length < 2 || bodyObj.address.length < 2) {
            throw new SyntaxError('Мало информации');
          } else {
            res.status(200).send('Заявка принята');
          }
        } else {
          if (bodyObj.phone.length < 2) {
            throw new SyntaxError('Мало информации');
          } else {
            res.status(200).send('Заявка принята');
          }
        }
      } catch (e) {
        if (e.message === 'Мало информации') {
          res.status(422).send('Ошибка: Вы ввели слишком мало информации. Заявка не принята. Попробуйте снова.');
        } else {
          res.status(500).send('Произошла непредвиденная ошибка. Заявка не принята. Попробуйте снова.');
        }
      }
    });
  })
  .get('/', serverStat);

app.listen(8080);

console.log(' Сервер запущен на порту 8080. Откройте http://localhost:8080/ у себя в браузере. Чтобы остановить сервер, нажмите Ctrl+C');
