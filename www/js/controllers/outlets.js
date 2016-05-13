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
    });


    //// Methods ///////////////////////////////////////////
    $scope.goBack = function () {
      $state.go('app.home', {}, {reload: true});
    };

  });
