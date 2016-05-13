'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
  .controller('ConfirmCtrl', function ($scope, $state, $stateParams, $rootScope, $window, $log) {

    //// Variables /////////////////////////////////////////
    $scope.code = $stateParams.code;

    //// Methods  /////////////////////////////////////////
    $scope.goBack = function () {
      $state.go('app.scan', {outletId: $stateParams.outletId}, {reload: true});
    };

  });
