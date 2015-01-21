var unoconv = require('unoconv');
var fs = require('fs');

unoconv.listen();

function toPdf(fileName, page, cb) {
  var exportStr = 'PageRange=' + page + '-' + page;
  unoconv.convert(fileName, 'pdf', {
    nolaunch: true,
    exportStr: exportStr
  }, cb);
}

function toPng(fileName, cb) {
  unoconv.convert(fileName, 'png', {nolaunch: true, stdout: true}, cb);
}

module.exports = function(fileName, opts, cb) {
  if('function' === typeof opts) {
    cb = opts;
    opts = {};
  }

  opts = opts || {};
  toPdf(fileName, opts.page || 1, function(err, pdfBuf) {
    fileName = fileName + '.pdf';
    toPng(fileName, cb);
  });
};