var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  title: String,
  completed: Boolean
});

module.exports = Todo;
