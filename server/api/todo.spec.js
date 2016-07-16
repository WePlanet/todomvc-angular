var request = require('supertest');
var app = require('../app');
var mongoose = require('mongoose');
var should = require('should');

describe('API TEST', function () {

  var todo;

  before('connect database', function (done) {
    mongoose.connect('mongodb://localhost:27017/todomvc_codelab_test', function (err) {
      if (err) throw err;
      done();
    });
  });

  after('cleanup database', function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });

  it('GET /api/todos should return todo array', function (done) {
    request(app)
        .get('/api/todos')
        .end(function (err, res) {
          if (err) throw err;
          res.body.should.be.instanceof(Array).and.have.length(0);
          done();
        });
  });

  it('POST /api/todos should create new todo', function (done) {
    request(app)
        .post('/api/todos')
        .send({title: 'todo1'})
        .expect(201)
        .end(function (err, res) {
          if (err) throw err;
          res.body.should.have.properties('_id', 'title', 'completed');
          res.body._id.should.be.String();
          res.body.title.should.be.String();
          res.body.completed.should.be.Boolean();

          todo = res.body;

          done();
        })
  });

  it('PUT /api/todos/:id should update a todo', function (done) {
    request(app)
        .put('/api/todos/' + todo._id)
        .send({title: todo.title, completed: true})
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          res.body.completed.should.be.equal(true);
          res.body.title.should.be.equal(todo.title);
          res.body._id.should.be.equal(todo._id);
          done();
        })
  });

  it('DELETE /api/todos/:id should remove a todo', function (done) {
    request(app)
        .delete('/api/todos/' + todo._id)
        .expect(204)
        .end(done);
  });

  it('DELETE /api/todos/completed should return array', function (done) {
    request(app)
        .delete('/api/todos/completed')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          res.body.should.be.instanceof(Array).and.have.length(0);
          done();
        });
  });

});

















