angular.module('todomvc')
    .directive('todoItem', function () {
      return {
        restrict: 'E',
        template:
            '<div class="input-group">' +
              '<span class="input-group-addon">' +
                '<input type="checkbox" ng-model="todo.completed" ng-click="update(todo)">' +
              '</span>' +
              '<input type="text" class="form-control" ng-model="todo.title" ng-blur="update(todo)">' +
              '<div class="input-group-btn">' +
                '<button class="btn btn-danger" ng-click="remove(todo)">Remove</button>' +
              '</div>' +
            '</div>'
      };
    });
