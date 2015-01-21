var unoconv = require('unoconv');
var path = require('path');
var fs = require('fs');

module.exports = function(name, cb) {
  var ext = path.extname(name);

  // If it's already a pdf, just return the file as a Buffer
  if(ext === '.pdf') {
    cb(null, fs.readFileSync(name));
    return;
  }

  unoconv.convert(name, 'pdf', cb);
};