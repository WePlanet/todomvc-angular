var mongoose = require('mongoose');
var Todo = mongoose.model('todo', {
  title: String,
  completed: Boolean
});

module.exports = Todo;