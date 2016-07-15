angular.module('todomvc')
    .factory('todoStorage', function ($http, $resource) {
      var Todo = $resource('/api/todos/:id', {id: '@id'});
      
      var storage = {
        todos: [],

        clearCompleted: function () {
          $http.delete('/api/todos/completed')
              .then(function (res) {
                angular.copy(res.data, storage.todos);
              })
        },

        remove: function (todoId) {
          // server data remove
          $http.delete('/api/todos/' + todoId)
              .then(function (res) {
                // find index of array
                var idx = storage.todos.findIndex(function (t) {
                  return t._id === todoId;
                });

                if (idx === -1) return;

                // remove from array
                storage.todos.splice(idx, 1);
              });
        },

        post: function (title) {
          $http.post('/api/todos', {title: title})
              .then(function (res) {
                storage.todos.push(res.data);
              })
        },

        get: function (callback) {
          // $http.get('/api/todos')
          //     .then(function (res) {
          //       storage.todos = res.data;
          //       callback(null, storage.todos);
          //     }, function (err) {
          //       callback(err);
          //     })

          Todo.query().$promise.then(function (todos) {
            callback(todos);
          })
        },

        update: function (todo) {
          console.log('update() in todoStroage.js');
          $http.put('/api/todos/' + todo._id, {title: todo.title, completed: todo.completed})
              .then(function (res) {
                console.log(res);
              }, function (err) {
                
              })
        }
      };

      return storage;
    });
