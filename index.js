var app = require('express')();
var mime = require('mime');
var request = require('superagent');
var docThumb = require('document-thumbnail');
var uuid = require('uuid');

app.get('/', function(req, res) {
  var url = req.param('url');
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