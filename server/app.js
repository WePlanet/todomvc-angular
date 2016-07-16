var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/todomvc_codelab', function (err, result) {
    if (err) throw err;
    console.log('connected mongodb!!');
  });
}

app.use(express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', require('./api/todo.js'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// For unit test
module.exports = app;
