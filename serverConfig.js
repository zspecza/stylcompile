module.exports = function(app) {

  'use strict';

  var express = require('express');
  var stylus = require('stylus');
  var nib = require('nib');
  var path = require('path');
  var port = process.env.PORT || 3000;

  app.configure(function() {
    app.set('port', port);
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

};
