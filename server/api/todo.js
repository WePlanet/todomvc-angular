var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');

router.get('/', function (req, res) {
  Todo.find(function (err, todos) {
    if (err) throw err;
    res.json(todos);
  })
});

router.post('/', function (req, res) {
  var todo = new Todo({
    title: req.body.title,
    completed: false
  });
  todo.save(function (err, todo) {
    if (err) throw err;
    res.json(todo);
  });
});

router.delete('/completed', function (req, res) {
  Todo.remove({completed: true}, function (err) {
    if (err) throw err;
    Todo.find(function (err, todos) {
      if (err) throw err;
      res.json(todos);
    });
  });
});

router.delete('/:id', function (req, res) {
  Todo.remove({_id: req.params.id}, function (err) {
    if (err) throw err;
    res.sendStatus(204);
  });
});

router.put('/:id', function (req, res) {
  Todo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, todo) {
    if (err) throw err;
    res.json(todo);
  });
});

module.exports = router;
