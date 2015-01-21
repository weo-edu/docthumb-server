var app = require('express')();
var mime = require('mime');
var request = require('superagent');
var docThumb = require('document-thumbnail');
var uuid = require('uuid');

var sslRootCas = require('ssl-root-cas/latest');
sslRootCas.inject();

app.get('/', function(req, res) {
  var url = req.params.url;
  request.get(url, function(err, res) {
    if(err) throw err;
    var type = res.header('Content-Type');
    var ext = mime.extension(type);
    var buf = res.body;
    var name = uuid.v4() + '.' + ext;
    fs.writeFileSync(name, buf);
    docThumb(name, function(err, pngBuf) {
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