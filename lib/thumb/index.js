var unoconv = require('unoconv');
var fs = require('fs');

unoconv.listen();

// function toPdf(fileName, page, cb) {
//   var exportStr = 'PageRange=' + page + '-' + (page + 1);
//   unoconv.convert(fileName, 'pdf', {
//     nolaunch: true,
//     stdout: true,
//     exportStr: exportStr
//   }, cb);
// }
var ports = [2000, 2001, 2002, 2003, 2004];

ports.forEach(function(port) {
  unoconv.listen({port: port});
});

var idx = 0;
function toPng(fileName, opts, cb) {
  if('function' === typeof opts) {
    cb = opts;
    opts = {};
  }

  opts = opts || {};

  var exportStr;
  if(opts.width) {
    exportStr = 'Width=' + opts.width;
  }

  var port = ports[idx++ % ports.length];
  console.log('port', port);

  unoconv.convert(fileName, 'png', {
    nolaunch: true,
    stdout: true,
    port: port,
    exportStr: exportStr
  }, cb);
}

module.exports = function(fileName, opts, cb) {
  if('function' === typeof opts) {
    cb = opts;
    opts = {};
  }

  opts = opts || {};
  toPng(fileName, opts, cb);
};