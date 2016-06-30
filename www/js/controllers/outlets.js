'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
  .controller('OutletsCtrl', function ($scope, $state, $rootScope, $window, $log, OutletsService) {



    //// Services Calls ///////////////////////////////////////////
    OutletsService.getAllOutlets().then(function (outlets) {
      $scope.outlets = outlets.data;
      $window.localStorage.setItem('outlets', JSON.stringify($scope.outlets));
    }, function () {
      if ($window.localStorage.getItem('outlets')) {
        $scope.outlets = JSON.parse($window.localStorage.getItem('outlets'));
      }
    });


    //// Methods ///////////////////////////////////////////
    $scope.goBack = function () {
      $state.go('app.home', {}, {reload: true});
    };

  });
