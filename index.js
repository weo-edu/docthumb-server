var app = require('express')();
var obtain = require('./lib/obtain');
var thumb = require('./lib/thumb');

app.get('/', function(req, res) {
  var url = req.query.url;
  var page = Number(req.query.page) || 1;

  obtain(url, function(err, fileName) {
    if(err) throw err;

    thumb(fileName, {page: page}, function(err, pngBuf) {
      if(err) throw err;

      res.header('Content-Type', 'image/png');
      res.send(pngBuf);
    });
 });
});

app.listen(80, function() {
  console.log('listening');
});