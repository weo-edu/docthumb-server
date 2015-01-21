var mime = require('mime');
var path = require('path');

module.exports = function(res) {
  var ctype = res.header['content-type'] || res.header['Content-Type'];
  var ext = mime.extension(ctype);
  if(!ext || ext === 'bin') {
    ext = path.extname(res.path).slice(1);
  }

  return ext;
};