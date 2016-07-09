angular.module('todomvc')
    .factory('todoStorage', function ($resource) {
      var Todo = $resource('/api/todos/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        },
        clearCompleted: {
          method: 'DELETE',
          isArray: 'true'
        }
      });

      function findIdx(collection, target, key) {
        return collection.findIndex(function (item) {
          return item[key] === target[key];
        });
      }

      var storage = {
        todos: [],

        get: function () {
          storage.todos = Todo.query();
          return storage.todos;
        },

        create: function (title) {
          return Todo.save({title: title})
              .$promise
              .then(function (data) {
                storage.todos.push(data);
              })
        },

        delete: function (todo) {
          Todo.delete({id: todo._id})
              .$promise
              .then(function () {
                var idx = findIdx(storage.todos, todo, '_id')
                if (idx > -1) storage.todos.splice(idx, 1);
              });
        },

        update: function (todo) {
          Todo.update({id: todo._id}, todo)
              .$promise
              .then(function (res) {
                var idx = findIdx(storage.todos, todo, '_id')
                if (idx > -1) storage.todos[idx] = todo;
              });
        },

        clearCompleted: function () {
          Todo.clearCompleted({id: 'completed'})
              .$promise
              .then(function (res) {
                angular.copy(res, storage.todos);
              });
        }
      };

      return storage;

    });
