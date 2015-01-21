var request = require('superagent');
var uuid = require('uuid');
var ext = require('../ext');
var fs = require('fs');
var Buffer = require('buffer').Buffer;

// Disable ssl cert checking
require('../insecure');

function parser(res, fn) {
  var data = [];
  res.on('data', function(chunk) {
    data.push(chunk);
  });

  res.on('end', function() {
    var buf = Buffer.concat(data);
    fn(null, buf);
  });
}

module.exports = function(url, cb) {
  request
    .get(url)
    .parse(parser)
    .buffer(true)
    .end(function(err, res) {
      if(err) throw err;
      var out = uuid.v4() + '.' + ext(res);
      fs.writeFileSync(out, res.body);
      cb(null, out);
    });
};