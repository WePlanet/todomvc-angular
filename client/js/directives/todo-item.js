angular.module('todomvc')
    .directive('todoItem', function () {
      return {
        template:
         '<div class="input-group">' +
            '<span class="input-group-addon">' +
              '<input type="checkbox" ng-model="todo.completed">' +
            '</span>' +
            '<input type="text" ng-model="todo.title" class="form-control">' +
            '<span class="input-group-btn">' +
              '<button type="button" class="btn btn-danger"' + 'ng-click="remove(todo.id)">Remove</button>' +
            '</span>' +
          '</div>'
      };
    });
