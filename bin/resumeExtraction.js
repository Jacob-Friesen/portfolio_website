var replaceStream = require('replacestream'),
    fs = require('fs'),
    path = require('path');

var fileNameFromJS = process.argv[2],
    fileNameToJS = process.argv[3],
    fileNameFromJSON = process.argv[4],
    fileNameToJSON = process.argv[5];

// Transform the links into a format that can directly be handled by the application router.
fs.createReadStream(fileNameFromJS)
  .pipe(replaceStream(
    'a(href= links[part[0]].address)',
    'a(class="like-link", title=links[part[0]].address, (click)="navigateParent(\'"+links[part[0]].address+"\')")'
  ))
  .pipe(fs.createWriteStream(fileNameToJS));

// Make sure the jacobfriesen.com links route in-site instead of to external URLs.
fs.createReadStream(fileNameFromJSON)
  .pipe(replaceStream(
    'http://jacobfriesen.com/',
    '/'
  ))
  .pipe(fs.createWriteStream(fileNameToJSON));