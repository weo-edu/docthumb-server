
module.exports = function(req, res, next) {
  res.sendPng = function(pngBuf) {
    res.header('Content-Type', 'image/png');
    res.end(pngBuf);
  };
};