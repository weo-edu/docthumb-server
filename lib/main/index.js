var app = module.exports = require('express')();
var obtain = require('./lib/obtain');
var thumb = require('./lib/thumb');


app.get('/', function(req, res) {
  var url = req.query.url;
  var page = Number(req.query.page);
  var width = Number(req.query.width);

  thumbify(url, {page: page, width: width}, function(err, pngBuf) {
    if(err) throw err;
    res.sendPng(pngBuf);
  });
});

function thumbify(url, opts, cb) {
  if('function' === typeof opts) {
    cb = opts;
    opts = {};
  }

  opts = opts || {};
  obtain(url, function(err, fileName) {
    if(err) return cb(err);
    thumb(fileName, {page: opts.page, width: opts.width}, cb);
  });
}