var request = require('superagent');
var mime = require('mime');
var uuid = require('uuid');

// Disable ssl cert checking
require('../insecure');

module.exports = function(url, cb) {
  request.get(url, function(err, res) {
    if(err) {
      cb(err);
      return;
    }

    var type = res.header('Content-Type');
    var ext = mime.extension(type);

    var out = uuid.v4() + '.' + ext;
    res
      .pipe(fs.createWriteStream(out))
      .on('end', function() {
        cb(null, out);
      });
  });
};