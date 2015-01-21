var unoconv = require('unoconv');
var fs = require('fs');

unoconv.listen();

function toPdf(fileName, page, cb) {
  var exportStr = 'PageRange=' + page + '-' + (page + 1);
  unoconv.convert(fileName, 'pdf', {
    nolaunch: true,
    stdout: true,
    exportStr: exportStr
  }, cb);
}

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

  unoconv.convert(fileName, 'png', {
    nolaunch: true,
    stdout: true,
    exportStr: exportStr
  }, cb);
}

module.exports = function(fileName, opts, cb) {
  if('function' === typeof opts) {
    cb = opts;
    opts = {};
  }

  opts = opts || {};
  toPdf(fileName, opts.page || 1, function(err, pdfBuf) {
    fileName = fileName + '.pdf';
    fs.writeFile(fileName, pdfBuf, 'binary', function(err) {
      if(err) return cb(err);
      toPng(fileName, opts, function(err, pngBuf) {
        // Cleanup our temporary file.  Cleanup doesn't
        // need to block the callback.
        fs.unlink(fileName, function(err) {
          if(err) throw err;
        });

        if(err) return cb(err);
        cb(null, pngBuf);
      });
    });
  });
};