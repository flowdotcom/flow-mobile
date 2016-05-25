'use strict';

angular.module('flow')
  .service('UserService', function ($rootScope, $http, ConfigData) {

    this.getUser = function () {
      return $http.get(ConfigData.api_endpoint + "me");
    };

  });
