var express = require('express');
var app = express();

// configure server middleware
require('./serverConfig')(app);

// load all route controllers
require('./controllers')(app);

app.listen(app.get('port'), function() {
  console.log('Listening on %s...', app.get('port'));
});
