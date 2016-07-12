angular.module('todomvc')
    .factory('todoStorage', function () {
      var storage = {
        todos: [
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
        ],

        clearCompleted: function () {
          var incompletedTodos = storage.todos.filter(function (t) {
            return t.completed === false;
          });
          angular.copy(incompletedTodos, storage.todos);
        },

        remove: function (todoId) {
          // find index of array
          var idx = storage.todos.findIndex(function (t) {
            return t.id === todoId;
          });

          if (idx === -1) return;

          // remove from array
          stroage.todos.splice(idx, 1);

          // var tmp = storage.todos.filter(function (t) {
          //   return t.id !== todoId;
          // });
          //
          // angular.copy(tmp, storage.todos);
        },

        post: function (title) {
          // id 생성
          var newId = storage.todos.length ?
              storage.todos[storage.todos.length - 1].id + 1 :
              1;

          // new Todo
          var newTodo = {
            id: newId,
            title: title,
            completed: false
          };

          // add to array
          storage.todos.push(newTodo);
        },

        get: function () {
          return storage.todos;
        },
      };

      return storage;
    });
