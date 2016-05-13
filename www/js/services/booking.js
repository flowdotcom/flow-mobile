'use strict';

angular.module('flow')
  .service('BookingService', function ($rootScope, $http, ConfigData) {

    this.getBookingByBarcode = function (code) {
      return $http.get(ConfigData.api_endpoint + "booking/" + code);
    };

    this.submitSuccessBooking = function (code, data) {
      return $http.put(ConfigData.api_endpoint + "booking/" + code, data);
    };

    this.submitAbortBooking = function (code, data) {
      return $http.put(ConfigData.api_endpoint + "booking/" + code, data);
    };

  });
