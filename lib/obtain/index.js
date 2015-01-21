var request = require('superagent');
var uuid = require('uuid');
var ext = require('../ext');
var fs = require('fs');

// Disable ssl cert checking
require('../insecure');

module.exports = function(url, cb) {
  request.get(url, function(res) {
    var out = uuid.v4() + '.' + ext(res);
    res
      .pipe(fs.createWriteStream(out))
      .on('finish', function() {
        cb(null, out);
      });
  });
};