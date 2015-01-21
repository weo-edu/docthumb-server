var app = require('express')();
var docThumb = require('document-thumbnail');
var obtain = require('./lib/obtain');
var unoconv = require('unoconv');

unoconv.listen();
app.get('/', function(req, res) {
  var url = req.query.url;

  obtain(url, function(err, fileName) {
    if(err) throw err;

    unoconv.convert(fileName, 'png', {exportStr: 'PageRange=1-1', stdout: true}, function(err, pngBuf) {
      res.header('Content-Type', 'image/png');
      res.send(pngBuf);
    });
    // docThumb(fileName, function(err, pngBuf) {
    //   if(err) throw err;

    //   res.header('Content-Type', 'image/png');
    //   res.send(pngBuf);
    // });
  });
});

app.listen(80, function() {
  console.log('listening');
});