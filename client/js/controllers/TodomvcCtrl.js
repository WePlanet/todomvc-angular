angular.module('todomvc')
    .controller('TodomvcCtrl', function ($scope, todoStorage) {

      $scope.clearCompleted = function () {
        todoStorage.clearCompleted();
      };

      $scope.add = function (newTodoTitle) {
        newTodoTitle = newTodoTitle.trim();
        if (!newTodoTitle) return;
        todoStorage.post(newTodoTitle);
        $scope.newTodoTitle = '';
      };

      $scope.remove = function (todoId) {
        todoStorage.remove(todoId);
      };

      $scope.todos = todoStorage.get();
    });
