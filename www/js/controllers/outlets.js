'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
  .controller('OutletsCtrl', function ($scope, $state, $rootScope, $window, $log, OutletsService) {



    //// Services Calls ///////////////////////////////////////////
    if ($window.localStorage.getItem('outlets')) {
      $scope.outlets = JSON.parse($window.localStorage.getItem('outlets'));
    } else {
      OutletsService.getAllOutlets().then(function (outlets) {
        $scope.outlets = outlets.data;
        $window.localStorage.setItem('outlets', JSON.stringify($scope.outlets));
      });
    }


    //// Methods ///////////////////////////////////////////
    $scope.goBack = function () {
      $state.go('app.home', {}, {reload: true});
    };

  });
