var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var todos = [
    {
      id: 1,
      title: '요가수련',
      completed: true
    },
    {
      id: 2,
      title: '코드랩',
      completed: false
    },
    {
      id: 3,
      title: '운동',
      completed: true
    }
  ];

app.use(express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.put('/api/todos/:id', function (req, res) {
  // find index of array
  var idx = todos.findIndex(function (t) {
    return t.id == req.params.id; // 1 == "1"
  });
  if (idx === -1) return res.sendStatus(404); 

  // update
  todos[idx].title = req.body.title;
  todos[idx].completed = req.body.completed === 'true';

  // response updated object
  res.json(todos[idx]);
});

app.delete('/api/todos/:id', function (req, res) {
  // find index of array
  var idx = todos.findIndex(function (t) {
    return t.id == req.params.id; // 1 == "1"
  });

  if (idx === -1) return res.sendStatus(404); 

  // remove from array
  todos.splice(idx, 1);

  res.sendStatus(204);
});

app.get('/api/todos', function (req, res) {
  res.json(todos);
});

app.post('/api/todos', function (req, res) {
  // id 생성
  var newId = todos.length ? todos[todos.length - 1].id + 1 : 1;

  // new Todo
  var newTodo = {
    id: newId,
    title: req.body.title,
    completed: false
  };

  // add to array
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
