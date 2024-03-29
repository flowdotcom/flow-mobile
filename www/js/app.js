// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('flow', ['ionic', 'satellizer', 'LocalStorageModule', 'ngCordova', 'ngAria', 'cfp.hotkeys', 'ion-digit-keyboard', 'ionic-numberpicker', 'angularMoment'])


    .constant('ConfigData', {
        api_endpoint: 'https://flow-solution.fr/api/'
        //api_endpoint: 'http://n64.ovh/api/'
    })


    .run(function ($rootScope, $ionicPlatform, $ionicHistory, $window, $auth, $location) {

        $rootScope.offline = true;

        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        if ($auth.isAuthenticated()) {
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        } else {
            $location.path('login');
        }

    })

    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('flow');
        localStorageServiceProvider.setStorageType('localStorage');
    })

    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);
    })

    .config(function ($stateProvider, $urlRouterProvider, $authProvider, ConfigData) {
        $stateProvider

        //auth login
            .state('login', {
                cache: false,
                url: "/login",
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('logout', {
                cache: false,
                url: "/logout",
                controller: 'LogoutCtrl'
            })

            // setup an abstract state for the tabs directive
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: "AppCtrl"
            })

            .state('app.home', {
                cache: false,
                url: "/home",
                views: {
                    'tab-home': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                },
                authenticated: true
            })

            //outlets
            .state('app.outlets', {
                cache: false,
                url: "/outlets",
                views: {
                    'tab-scan': {
                        templateUrl: 'templates/outlets.html',
                        controller: 'OutletsCtrl'
                    }
                },
                authenticated: true
            })

            //scan
            .state('app.scan', {
                cache: false,
                url: "/scan/:outletId",
                views: {
                    'tab-scan': {
                        templateUrl: 'templates/scan.html',
                        controller: 'ScanCtrl'
                    }
                },
                authenticated: true
            })

            //scan
            .state('app.confirm', {
                cache: false,
                url: "/confirm/:outletId/code/:code",
                views: {
                    'tab-scan': {
                        templateUrl: 'templates/confirm.html',
                        controller: 'ConfirmCtrl'
                    }
                },
                authenticated: true
            })

            //settings
            .state('app.settings', {
                cache: false,
                url: "/settings",
                views: {
                    'tab-settings': {
                        templateUrl: 'templates/settings.html',
                        controller: 'SettingsCtrl'
                    }
                },
                authenticated: true
            })

            //settings - failed
            .state('app.failed', {
                cache: false,
                url: "/failed",
                views: {
                    'tab-settings': {
                        templateUrl: 'templates/failed.html',
                        controller: 'FailedCtrl'
                    }
                },
                authenticated: true
            });

        $urlRouterProvider.otherwise('/app/home');

        $authProvider.loginUrl = ConfigData.api_endpoint + 'auth/signin';
        $authProvider.tokenRoot = 'data';
        $authProvider.httpInterceptor = true;
    });
