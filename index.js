var app = require('express')();
var obtain = require('./lib/obtain');
var thumb = require('./lib/thumb');

unoconv.listen();
app.get('/', function(req, res) {
  var url = req.query.url;

  obtain(url, function(err, fileName) {
    if(err) throw err;

    thumb(fileName, function(err, pngBuf) {
      if(err) throw err;

      res.header('Content-Type', 'image/png');
      res.send(pngBuf);
    });
 });
});

app.listen(80, function() {
  console.log('listening');
});