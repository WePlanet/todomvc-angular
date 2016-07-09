angular.module('todomvc')
    .controller('TodomvcCtrl', function ($scope, todoStorage) {

      $scope.todos = todoStorage.get();

      $scope.add = function (title) {
          title = title.trim();
          if (!title) return;
          todoStorage.create(title).finally(function () {
            $scope.newTodoTitle = '';
          })
      };

      $scope.remove = function (todo) {
        if (!todo) return;
        todoStorage.delete(todo);
      };

      $scope.update = function (todo) {
        if (!todo) return
        todoStorage.update(todo);
      };

      $scope.clearCompleted = function () {
        todoStorage.clearCompleted();
      };
    });
