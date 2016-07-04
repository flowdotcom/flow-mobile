'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
    .controller('ConfirmCtrl', function ($scope, $state, $stateParams, $rootScope, $window, $location, $log, $ionicPopup, hotkeys, OfflineService) {

        //// Variables /////////////////////////////////////////
        $scope.code = $stateParams.code;
        $scope.booking = OfflineService.getBooking($scope.code, $stateParams.outletId);
        hotkeys.add({
            combo: 'plus',
            callback: function () {
                $scope.increment();
            }
        });

        hotkeys.add({
            combo: 'up',
            callback: function () {
                $scope.increment();
            }
        });

        hotkeys.add({
            combo: 'right',
            callback: function () {
                $scope.increment();
            }
        });


        hotkeys.add({
            combo: '-',
            callback: function () {
                $scope.decrement();
            }
        });

        hotkeys.add({
            combo: 'down',
            callback: function () {
                $scope.decrement();
            }
        });

        hotkeys.add({
            combo: 'left',
            callback: function () {
                $scope.decrement();
            }
        });

        hotkeys.add({
            combo: 'enter',
            callback: function () {
                $scope.send();
            }
        });


        //// Initialization /////////////////////////////////////////
        if ($scope.booking.status) {

            hotkeys.del('plus');
            hotkeys.del('up');
            hotkeys.del('right');
            hotkeys.del('-');
            hotkeys.del('down');
            hotkeys.del('left');
            hotkeys.del('enter');
            $scope.message = $scope.booking.message;

        } else {

            var booking_data = JSON.parse($scope.booking.json_check);
            $scope.current = booking_data[$stateParams.outletId].current;
            $scope.base = booking_data[$stateParams.outletId].base;

            console.log(booking_data);
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

                hotkeys.del('plus');
                hotkeys.del('up');
                hotkeys.del('right');
                hotkeys.del('-');
                hotkeys.del('down');
                hotkeys.del('left');
                hotkeys.del('enter');
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
            $log.debug("22");
            $state.go('app.scan', {outletId: $stateParams.outletId});


        };

    });
