var express = require('express');
var app = express();
var stylus = require('stylus');
var path = require('path');
var nib = require('nib');
var port = process.env.PORT || 3000;

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(stylus.middleware({
    src: __dirname + '/assets',
    compile: function(str, path) {
      return stylus(str).set('filename', path).use(nib()).import('nib');
    }
  }));
  app.use(express.static(path.join(__dirname, 'assets')));
  app.use(app.router);
});

app.get('/*', function(req, res) {
  res.sendfile('index.html');
});

app.post('/', function(req, res) {
  var css = req.body.stylus;
  stylus.render(req.param('stylus'), function(err, css) {
    if (err) res.send({ error: err });
    res.send({ css: css });
  });
});

app.listen(port, function() {
  console.log('Listening on %s...', port);
});
