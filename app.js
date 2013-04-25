var PORT = process.argv[2];

/**
 * Module dependencies.
 */

global.constant = require('./public/constants.js');
var http = require('http');
var express = require('express');
var app = module.exports = express();
var server = http.createServer(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: 'layout.jade'});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  //app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public', { maxAge: 86400000 }));// 1 day in ms
  
  app.use(express.favicon(__dirname + '/public/images/favicon.ico', { maxAge: 604800000 }));// 1 week in ms
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
require('./routes')(app);
//require('./routes/mobile')(app);

server.listen(PORT, function(){
  console.log("JacobFriesen.com listening on port %d in %s mode", server.address().port, app.settings.env);
});
