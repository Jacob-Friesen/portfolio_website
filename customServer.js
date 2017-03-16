'use strict';

const compression = require('compression'),
      connect = require('connect'),
      contentDisposition = require('content-disposition'),
      serveStatic = require('serve-static');

if (!process.argv[2]){
  throw('You must specify a port');
}

connect().use(compression())
         .use(serveStatic(__dirname, {
  'setHeaders': (res, path) => {
    if (path.indexOf('.pdf') > -1) {
      res.setHeader('Content-Disposition', contentDisposition(path));
    }
  }
})).listen(process.argv[2]);
console.log('Now listening on port', process.argv[2]);