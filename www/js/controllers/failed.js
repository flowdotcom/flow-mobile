'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
  .controller('FailedCtrl', function ($scope, $state, $rootScope, $window) {



    //// Services Calls ///////////////////////////////////////////
    if ($window.localStorage.getItem('failed')) {
      $scope.failed = JSON.parse($window.localStorage.getItem('failed'));
    } else {
      $scope.failed = null;
    }


    //// Methods ///////////////////////////////////////////
    $scope.clearFailed = function () {
      $scope.failed = null;
      $window.localStorage.setItem('failed', JSON.stringify({}));
    };

    $scope.goBack = function () {
      $state.go('app.settings', {}, {reload: true});
    };

  });

