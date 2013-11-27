module.exports = function(app) {

  'use strict';

  var stylus = require('stylus');

  app.post('/', function(req, res) {
    stylus.render(req.param('stylus'), function(err, css) {
      if (err) res.send({ error: err });
      res.send({ css: css });
    });
  });

};
