angular.module('todomvc')
    .factory('todoStorage', function ($http) {
      var storage = {
        todos: [],

        clearCompleted: function () {
          var incompletedTodos = storage.todos.filter(function (t) {
            return t.completed === false;
          });
          angular.copy(incompletedTodos, storage.todos);
        },

        remove: function (todoId) {
          // server data remove
          $http.delete('/api/todos/' + todoId)
              .then(function (res) {
                // find index of array
                var idx = storage.todos.findIndex(function (t) {
                  return t.id === todoId;
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
          $http.get('/api/todos')
              .then(function (res) {
                storage.todos = res.data;
                callback(null, storage.todos);
              }, function (err) {
                callback(err);
              })
        },
      };

      return storage;
    });
