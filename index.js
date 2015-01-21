var app = require('express')();
var docThumb = require('document-thumbnail');
var obtain = require('./lib/obtain');

app.get('/', function(req, res) {
  var url = req.query.url;

  obtain(url, function(err, fileName) {
    docThumb(fileName, function(err, pngBuf) {
      res.header('Content-Type', 'image/png');
      res.send(pngBuf);
    });
  });
});

app.get('/pdf', function(req, res) {

});

app.listen(80, function() {
  console.log('listening');
});