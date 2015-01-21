var docThumb = require('../');
var idx = process.argv[0] === 'node' || process.argv[0] === 'nodejs' ? 2 : 1;
var input = process.argv[idx];
var output = process.argv[idx + 1];

docThumb(input, output, function(err) {
  console.log('here', err);
  if(err) throw err;
  console.log('completed!');
});