const express = require('express'),
      compression = require('compression');

const app = express();
const oneDay = 86400000;

if (!process.argv[2]){
  throw('You must specify a port as the first argument.');
}

app.use(compression());
app.use(express.static(__dirname + '/dist', { maxAge: oneDay }));
app.use(express.static(__dirname + '/dist/production', { maxAge: oneDay }));
app.use(express.static(__dirname + '/dist/images', { maxAge: oneDay }));

// All remaining requests will just load the index page and Angular will handle routing.
app.all('/*', function(req, res, next) {
  res.sendFile('index.html', { root: __dirname + '/dist' });
});

app.listen(process.argv[2], function () {
  console.log(`jacobfriesen.com listening on port ${process.argv[2]}.`);
});