'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
    .controller('ScanCtrl', function ($scope, $state, $stateParams, $ionicPlatform, $rootScope, $window, $log, BookingService, hotkeys, $ionicPopup, OfflineService, $cordovaBarcodeScanner) {

        //// Variables /////////////////////////////////////////
        $scope.is_mobile = !!(ionic.Platform.platform() == 'android' || ionic.Platform.platform() == 'ios');
        $rootScope.decoder = null;
        $scope.numbers = "";
        var outlets = JSON.parse($window.localStorage.getItem('outlets'));
        $scope.currentOutlet = "";

        for (var i = 0; i < outlets.length; i++) {
            if (outlets[i].id == $stateParams.outletId) {
                $scope.currentOutlet = outlets[i].name;
                break;
            }
        }

        $scope.keyboardVisible = false;
        $scope.keyboardSettings = {
            action: function (number) {
                $scope.numbers = $scope.numbers + String(number);
            },
            leftButton: {
                html: '<i class="icon ion-close-circled"></i>',
                action: function () {
                    $scope.numbers = "";
                    $scope.keyboardVisible = false;
                }
            },
            rightButton: {
                html: '<i class="icon ion-checkmark-circled"></i>',
                action: function () {
                    $scope.goConfirm();
                }
            }
        };

        $scope.goConfirm = function () {
            $state.go('app.confirm', {outletId: $stateParams.outletId, code: parseInt($scope.numbers)}, {reload: true});
        };

        hotkeys.add({
            combo: 'space',
            callback: function () {
                $scope.toogleKeyboard();
            }
        });


        //// Methods ///////////////////////////////////////////
        $scope.handleData = function (data, from) {
            var code = data.code;

            if (data.format.replace('-', '').replace('_', '') == 'EAN13') {
                code = data.code.slice(0, -1);
                code = code.substring(6, 12);
            }

            if ($rootScope.decoder) {
                $log.debug($rootScope.decoder.getWorker());
                $rootScope.decoder.getWorker().terminate();
                $rootScope.decoder.stop();
                delete $rootScope.decoder;
            }


            $state.go('app.confirm', {outletId: $stateParams.outletId, code: code}, {reload: true});
        };

        $scope.scanQrBarcode = function () {
            $cordovaBarcodeScanner.scan().then(function (imageData) {
                $scope.handleData({
                    code: imageData.text,
                    format: imageData.format
                });
            });
        };

        if (!$scope.is_mobile) {

            if (!$rootScope.decoder) {
                $rootScope.decoder = new WebCodeCamJS("canvas").init({
                    tryVertical: true,
                    codeRepetition: false,
                    beep: 'lib/webcodecam/audio/beep.mp3',
                    decoderWorker: 'lib/webcodecam/js/DecoderWorker.js',
                    resultFunction: $scope.handleData
                });

            }

            $rootScope.decoder.play();
        }

        $scope.toogleKeyboard = function () {
            $scope.keyboardVisible = !$scope.keyboardVisible;
        };

        $scope.refreshDatabase = function () {
            OfflineService.initializeDatabase();
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.goBack = function () {
            $state.go('app.outlets', {}, {reload: true});
        };


    });
