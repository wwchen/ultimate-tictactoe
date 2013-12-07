(function() {
"use strict";

angular.module('ultimateTTT')
.directive('tttGrid', function() {
  return {
    restrict: 'AC',
    transclude: true,
    templateUrl: 'partials/tttGrid.html',
    controller: function($scope) {
      this.getCell = function(row, col) {
        // one based indexing
        if(row > 3 || col > 3) {
          throw "getCell: out of bounds";
        }
        // TODO fix to not use jquery, as scope is global
        return $('.tttGrid > div:nth-child(' + row + ') > div:nth-child(' + col + ')')
      }

      this.highlightCell = function(row, col) {
        var cell = getCell(row, col);
        cell.css('background-color', '#369');
      }

      this.switchPlayers = function() {
        var step = ++$scope.stepCount;
        return $scope.player = step % 2 == 0 ? 'O' : 'X';
      }

    },
    link: function ($scope, $element, $attrs) {
      $scope.stepCount = 0;
    }
  };
})

.directive('tttSubGrid', function() {
  return {
    restrict: 'AC',
    transclude: false,
    require: '^tttGrid',
    templateUrl: 'partials/tttSubGrid.html',
    link: function ($scope, $element, $attrs, ctrl) {
      var grid = ctrl;

      $element.find('.tttSubCell').click(function() {
        if(!this.innerText) {
          this.innerText = grid.switchPlayers();
        }
      });
    }
  }
});
}());
