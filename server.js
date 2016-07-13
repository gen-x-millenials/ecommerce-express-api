'use strict';
require('dotenv').load({
  silent: process.env.NODE_ENV === 'production', // don't log missing .env
});

const express = require('express');
const app = express();
const middleware = require('./app/middleware');

app.set('root', __dirname);

middleware.before(app);

const routes = require('./config/routes');

app.use(routes.router);

middleware.after(app);

// catch 404 and forward to error handler
app.use(middleware['404']);

// error handlers
app.use(middleware['error-handler']);

const debug = require('debug')('ecommerce-express-api:server');
const http = require('http');

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
  let port = parseInt(val, 10);
  return port >= 0 ? port : isNaN(port) ? val : false;
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () =>  {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
};

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// var express = require('express');
// var app = express();
//
// // set the port of our application
// // process.env.PORT lets the port be set by Heroku
// var port = process.env.PORT || 8080;
//
// // set the view engine to ejs
// app.set('view engine', 'ejs');
//
// // make express look in the public directory for assets (css/js/img)
// app.use(express.static(__dirname + '/public'));
//
// // set the home page route
// app.get('/', function(req, res) {
//
//     // ejs render automatically looks in the views folder
//     res.render('index');
// });
//
// app.listen(port, function() {
//     console.log('Our app is running on http://localhost:' + port);
// });
