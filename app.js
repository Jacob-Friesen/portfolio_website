'use strict'

const express = require('express'),
      compression = require('compression');

const app = express();
const oneDay = 86400000;

if (!process.argv[2]) {
  throw('You must specify a port as the first argument.');
}

app.use(compression());
app.use(express.static(__dirname + '/dist', { maxAge: oneDay }));
app.use(express.static(__dirname + '/dist/production', { maxAge: oneDay }));
app.use(express.static(__dirname + '/dist/images', { maxAge: oneDay }));

// In production the source maps will be disabled
app.all('/system-config.js.map', (req, res, next) => {
  res.send('');
});

// All remaining requests will just load the index page and Angular will handle routing.
app.all('/*', (req, res, next) => {
  res.sendFile('index.html', { root: __dirname + '/dist' });
});

app.listen(process.argv[2], () => {
  console.log(`jacobfriesen.com listening on port ${process.argv[2]}.`);
});