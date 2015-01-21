var unoconv = require('unoconv');

unoconv.listen();

function toPdf(fileName, page, cb) {
  var exportStr = 'PageRange=' + page + '-' + page;
  unoconv.convert(fileName, 'pdf', {
    nolaunch: true,
    stdout: true,
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
    fs.writeFileSync(fileName, pdfBuf);
    toPng(fileName, cb);
  });
};