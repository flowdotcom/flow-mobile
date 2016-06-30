'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
  .controller('HomeCtrl', function ($scope, $state, $rootScope, $window, $log, OfflineService) {

    $scope.updateDB = function () {
      OfflineService.initializeDatabase();
    };

  });
