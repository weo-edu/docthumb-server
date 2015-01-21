var gm = require('gm');

module.exports = function(source, opts) {
  return gm(source)
    .stream('png');
};