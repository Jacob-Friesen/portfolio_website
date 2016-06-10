var replaceStream = require('replacestream'),
    fs = require('fs'),
    path = require('path');

var fileNameFromJS = process.argv[2],
    fileNameToJS = process.argv[3],
    fileNameFromJSON = process.argv[4],
    fileNameToJSON = process.argv[5];

// Transform the links into a format that can directly be handled by the application router.
fs.createReadStream(path.join(__dirname, fileNameFromJS))
  .pipe(replaceStream(
    'a(href= links[part[0]].address)',
    'a(class="like-link", (click)="navigateParent(\'"+links[part[0]].address+"\')")'
  ))
  .pipe(fs.createWriteStream(path.join(__dirname, fileNameToJS)));

// Make sure the jacobfriesen.com links route in-site instead of to external URLs.
fs.createReadStream(path.join(__dirname, fileNameFromJSON))
  .pipe(replaceStream(
    'http://jacobfriesen.com/',
    '/'
  ))
  .pipe(fs.createWriteStream(path.join(__dirname, fileNameToJSON)));