var app = require('express')();
var docThumb = require('document-thumbnail');
var obtain = require('./lib/obtain');

app.get('/', function(req, res) {
  var url = req.query.url;

  console.log('obtaining', url);
  obtain(url, function(err, fileName) {
    if(err) throw err;

    console.log('obtained', fileName);
    docThumb(fileName, 'tmp.png', function(err, pngBuf) {
      if(err) throw err;

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