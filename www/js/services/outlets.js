'use strict';

angular.module('flow')
  .service('OutletsService', function ($rootScope, $http, ConfigData) {

    this.getAllOutlets = function () {
      return $http.get(ConfigData.api_endpoint + "outlets");
    };

    this.getOutletById = function (id) {
      return $http.get(ConfigData.api_endpoint + "outlets/" + id);

    };

  });
