angular.module('todomvc')
    .factory('todoStorage', function ($http, $resource) {

      var Todo = $resource('/api/todos/:id', {id: '@id'}, {
        clearCompleted: {
          method: 'DELETE',
          isArray: true
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
      
      var storage = {
        todos: [],

        clearCompleted: function () {
          Todo.clearCompleted({id: 'completed'})
              .$promise
              .then(function (todos) {
                angular.copy(todos, storage.todos);
              });
        },

        remove: function (todoId) {
          Todo.delete({id: todoId})
              .$promise
              .then(function () {
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
          Todo.save({title: title})
              .$promise
              .then(function (data) {
                console.log(data);
                storage.todos.push(data);
              });
        },

        get: function () {
          storage.todos = Todo.query();
          return storage.todos;
        },

        update: function (todo) {
          Todo.update({id: todo._id}, todo);
        }
      };

      return storage;
    });
