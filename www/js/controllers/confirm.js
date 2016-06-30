'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
  .controller('ConfirmCtrl', function ($scope, $state, $stateParams, $rootScope, $window, $location, $log, $ionicPopup, OfflineService) {

    //// Variables /////////////////////////////////////////
    $scope.code = $stateParams.code;
    $scope.booking = OfflineService.getBooking($scope.code, $stateParams.outletId);


    //// Initialization /////////////////////////////////////////
    if ($scope.booking.status) {

      $scope.message = $scope.booking.message;

    } else {

      var booking_data = JSON.parse($scope.booking.json_check);
      $scope.current = booking_data[$stateParams.outletId].current;

      $scope.increment = function () {
        if ($scope.current + 1 <= booking_data[$stateParams.outletId].current) {
          $scope.current++;
        }
      };

      $scope.decrement = function () {
        if ($scope.current - 1 >= 0) {
          $scope.current--;
        }
      };

      $scope.send = function () {
        
        booking_data[$stateParams.outletId].current = $scope.current;
        
        $scope.booking.json_check = JSON.stringify(booking_data);

        OfflineService.updateBooking($scope.code, $scope.booking).then(function () {
          OfflineService.scheduleUpdate().then(function () {
            $scope.goBack();
          });
        });

      };

    }


    //// Methods  /////////////////////////////////////////
    $scope.goBack = function () {
      $location.path('app/scan/' + $stateParams.outletId);
    };

  });
