'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
  .controller('AppCtrl', function ($scope, $state, $rootScope, $interval, $log, $window, $ionicPopup, ConfigData) {

    $scope.gotoScan = function () {
      $state.go('app.outlets', {}, {reload: true});
    };


  });
