module.exports = function(limit) {
  var queue = [];

  function remove(item) {
    var idx = queue.indexOf(item);
    if(idx !== -1)
      queue.splice(idx, 1);
  }

  function maybeDeque() {
    if(queue.length > 0 && queue.length <= limit)
      setTimeout(queue.shift());
  }

  return function(req, res, next) {
    var end = res.end;
    res.end = function() {
      end.apply(this, arguments);

      remove(next);
      maybeDeque();
    };

    queue.push(next);
    maybeDeque();
  };
};