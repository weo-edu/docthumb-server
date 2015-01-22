module.exports = function(limit) {
  var queue = [];

  function remove(item) {
    var idx = queue.indexOf(item);
    if(idx !== -1)
      queue.splice(idx, 1);
  }

  function maybeDeque() {
    if(queue.length > 0 && queue.length <= limit) {
      console.log('dequeing');
      setTimeout(queue.shift());
    }
  }

  return function(req, res, next) {
    var end = res.end;
    res.end = function() {
      end.apply(this, arguments);

      console.log('done');
      remove(next);
      maybeDeque();
    };

    queue.push(next);
    maybeDeque();
  };
};