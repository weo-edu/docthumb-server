var app = require('express')();
var mime = require('mime');
var request = require('superagent');
var docThumb = require('document-thumbnail');
var uuid = require('uuid');

var sslRootCas = require('ssl-root-cas/latest');
sslRootCas.inject();

app.get('/', function(req, res) {
  var url = req.params.url;
  request.get(url, function(err, docRes) {
    if(err) throw err;
    var type = docRes.header('Content-Type');
    var ext = mime.extension(type);
    var buf = docRes.body;
    var name = uuid.v4() + '.' + ext;

    docRes
      .pipe(fs.createWriteStream(name))
      .on('end', function() {
        docThumb(name, function(err, pngBuf) {
          res.header('Content-Type', 'image/png');
          res.send(pngBuf);
        });
      });
  });
});

app.get('/pdf', function(req, res) {

});

app.listen(80, function() {
  console.log('listening');
});