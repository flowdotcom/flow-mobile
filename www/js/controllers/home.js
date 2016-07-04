'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
  .controller('HomeCtrl', function ($scope, $state, $rootScope, $window, $log, OfflineService, OutletsService) {

    $scope.updateDB = function () {
      OfflineService.initializeDatabase();
      OutletsService.getAllOutlets().then(function (outlets) {
        $scope.outlets = outlets.data;
        $window.localStorage.setItem('outlets', JSON.stringify($scope.outlets));
      });
    };

  });
