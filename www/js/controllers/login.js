'use strict';
/*
 |
 | Authentication controller
 |
 */

angular.module('flow')
  .controller('LoginCtrl', function ($scope, $state, $auth, $window, $rootScope, $cordovaBarcodeScanner) {

    $scope.login = function () {
      $auth.login({email: $scope.email, password: $scope.password}).then(function (response) {

        $window.localStorage.currentUser = JSON.stringify(response.data.user);

        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);

        $state.go('app.home', {}, {reload: true});

      }).catch(function (response) {

        $scope.messages = [];

        if (response.data.message) {
          $scope.messages.push(response.data.message);
        } else {
          angular.forEach(response.data, function (results) {
            $scope.messages.push(results[0]);
          });
        }

      });
    };

    $scope.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };


  })

  .controller('LogoutCtrl', function ($scope, $auth, $state, $window) {

    if (!$auth.isAuthenticated()) {
      return;
    }

    $auth.logout().then(function () {
      $window.localStorage.removeItem("currentUser");
      $state.go('login', {}, {reload: true});
    });

  });
