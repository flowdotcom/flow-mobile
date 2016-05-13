'use strict';
/*
 |
 | Entry point controller (index, homepage)
 |
 */


angular.module('flow')
  .controller('ScanCtrl', function ($scope, $state, $stateParams, $rootScope, $window, $log, BookingService, $ionicPopup, $cordovaBarcodeScanner) {

    //// Variables /////////////////////////////////////////
    $scope.is_mobile = !!(ionic.Platform.platform() == 'android' || ionic.Platform.platform() == 'ios');
    $scope.decoder = null;
    $scope.numbers = "";

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
          $state.go('app.confirm', {outletId: $stateParams.outletId, code: parseInt($scope.numbers)}, {reload: true});
        }
      }
    };


    //// Methods ///////////////////////////////////////////
    $scope.handleData = function (data) {
      var code = data.code;

      if (data.format.replace('-', '').replace('_', '') == 'EAN13') {
        code = data.code.slice(0, -1);
        code = code.substring(6, 12);
      }

      $scope.decoder.stop();
      $state.go('app.confirm', {outletId: $stateParams.outletId, code: code}, {reload: true});
    };

    $scope.scanQrBarcode = function () {
      $cordovaBarcodeScanner.scan().then(function (imageData) {
        $scope.handleData(imageData);
      });
    };

    if (!$scope.is_mobile) {
      $scope.decoder = new WebCodeCamJS("canvas").init({
        tryVertical: true,
        codeRepetition: false,
        beep: 'lib/webcodecam/audio/beep.mp3',
        decoderWorker: 'lib/webcodecam/js/DecoderWorker.js',
        resultFunction: $scope.handleData
      });
      $scope.decoder.init();
      $scope.decoder.play();
    }

    $scope.toogleKeyboard = function () {
      $scope.keyboardVisible = !$scope.keyboardVisible;
    };

    $scope.goBack = function () {
      $state.go('app.outlets', {}, {reload: true});
    };

  });
