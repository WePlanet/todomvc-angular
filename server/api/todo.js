var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');
  
router.put('/todos/:id', function (req, res) {
  var body = {
    title: req.body.title,
    completed: req.body.completed
  };
  Todo.findOneAndUpdate({_id: req.params.id}, body, {new: true}, function (err, todo) {
    if (err) throw err;
    res.json(todo);
  });
});

router.delete('/todos/completed', function (req, res) {
  Todo.remove({completed: true}, function (err) {
    if (err) throw err;
  
    Todo.find({}, function (err, todos) {
      if (err) throw err;
      res.json(todos);
    })
  });
});

router.delete('/todos/:id', function (req, res) {
  Todo.remove({_id: req.params.id}, function (err) {
    if (err) throw err;
    res.sendStatus(204);
  });
});

router.get('/todos', function (req, res) {
  Todo.find({}, function (err, todos) {
    if (err) throw err;
    res.json(todos);
  });
});

router.post('/todos', function (req, res) {
  var newTodo = new Todo({
    title: req.body.title,
    completed: false
  });
  newTodo.save(function (err, todo) {
    if (err) throw err;
    res.status(201).json(newTodo);
  });
});

module.exports = router;  
