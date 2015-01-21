var app = require('express')();


app.use(require('morgan')('tiny'));
app.use(require('./lib/send-png'));
app.use(require('./lib/main'));

app.listen(Number(process.env.PORT) || 80, function() {
  console.log('listening');
});