var app = module.exports = require('express')();
var obtain = require('../obtain');
var thumb = require('../thumb');
var requestQueue = require('../request-queue');
var fs = require('fs');

app.get('/', requestQueue(12), function(req, res) {
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
    thumb(fileName, {page: opts.page, width: opts.width}, function(err, pngBuf) {
      // Cleanup our temporary file (doesn't need to block the callback)
      fs.unlink(fileName, function(err) { if(err) throw err; });
      cb(err, pngBuf);
    });
  });
}