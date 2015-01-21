var request = require('superagent');
var ext = require('../ext');
var uuid = require('uuid');

// Disable ssl cert checking
require('../insecure');

module.exports = function(url, cb) {
  request.get(url, function(err, res) {
    if(err) {
      cb(err);
      return;
    }

    var out = uuid.v4() + '.' + ext(res);
    res
      .pipe(fs.createWriteStream(out))
      .on('end', function() {
        cb(null, out);
      });
  });
};