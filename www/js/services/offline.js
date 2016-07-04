'use strict';

angular.module('flow')
  .service('OfflineService', function (ConfigData, $http, $log, $window, $ionicLoading, $rootScope, $interval, localStorageService, moment, $q, OfflineService) {

    this.initializeDatabase = function () {
      $ionicLoading.show({template: 'Chargement...'});

      $http.get(ConfigData.api_endpoint + "booking/fetch").then(function (result) {

        localStorageService.clearAll();

        angular.forEach(result.data, function (booking) {
          localStorageService.set(booking.barcode, booking);
        });

        $ionicLoading.hide();
      });
    };

    this.getBooking = function (code, outletId) {

      var booking = localStorageService.get(code);

      // Existence ///////////////////////////////////////////////////////////
      if (!booking) {
        return {status: true, message: "Ce billet n'a pas été trouvé"};
      }

      var check = JSON.parse(booking.json_check);

      // Outlet Check ////////////////////////////////////////////////////////
      if (check[outletId] == undefined) {
        return {status: true, message: "Ce billet ne correspond pas à cette billeterie"};
      }

      // Entries Check ///////////////////////////////////////////////////////
      for (var key in check) {
        if (check.hasOwnProperty(key)) {
          if (key == outletId) {
            if (check[key].current == 0) {
              return {status: true, message: "Ce billet n'a plus de places disponibles"};
            }
          }
        }
      }

      var today = moment();
      var date_start = moment.unix(booking.date_start);
      var date_end = moment.unix(booking.date_end);

      // Date Check ////////////////////////////////////////////////////////
      if (!today.isBetween(date_start, date_end)) {
        return {status: true, message: "Ce billet n'est pas valable pour la date donnée"};
      }

      return booking;

    };

    this.updateBooking = function (code, data) {

      var q = $q.defer();

      var bookings;

      if (localStorage.getItem('updates') === null) {
        bookings = {};
      } else {
        bookings = JSON.parse(localStorage.getItem('updates'));
      }

      bookings[code] = data;

      window.localStorage.setItem('updates', JSON.stringify(bookings));

      q.resolve(true);

      return q.promise;

    };

    this.uploadChanges = function () {

      $http.post(ConfigData.api_endpoint + "booking/update", JSON.parse(localStorage.getItem('updates'))).then(function (result) {

        if (result.data.status == 'ok') {

          window.localStorage.setItem('updates', JSON.stringify({}));

        } else if (result.data.status == 'partial') {

          window.localStorage.setItem('updates', JSON.stringify({}));
          window.localStorage.setItem('failed', JSON.stringify(result.data.failed));

        }

        $http.get(ConfigData.api_endpoint + "booking/fetch").then(function (result) {
          angular.forEach(result.data, function (booking) {
            localStorageService.set(booking.barcode, booking);
          });
        });
      });
    };

    this.scheduleUpdate = function () {

      var q = $q.defer();

      if ($rootScope.interval) {
        $interval.cancel($rootScope.interval);
      }

      $rootScope.interval = $interval(function () {
        OfflineService.uploadChanges();
      }, 30000);

      q.resolve(true);

      return q.promise;
    };

  });
