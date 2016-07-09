var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Express settings
app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

// Routes
app.use('/api/todos', require('./api/todo'));

// Monogodb Settings
mongoose.connect('mongodb://localhost:27017/todomvc', function (err) {
  if (err) throw err;
  console.log('Connected mongodb!');
});

// Listening
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
