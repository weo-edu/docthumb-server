module.exports = function(limit) {
  var queue = [];
  var n = 0;

  function remove(item) {
    var idx = queue.indexOf(item);
    if(idx !== -1)
      queue.splice(idx, 1);
  }

  return function(req, res, next) {
    n++;

    var end = res.end;
    res.end = function() {
      end.apply(this, arguments);
      queue.length
        ? setTimeout(queue.shift())
        : n--;
    };

    n > limit ? queue.push(next) : next();
  };
};