'use strict';
define([
    'angular',
    'angular-cookies',
    '../services/uye-service'
], function(angular, angularCookie, uyeServiceModule) {

    var module = angular.module('uyeBilgiController', [
        uyeServiceModule.name,
        'ngCookies'
    ]).controller('UyeBilgiController', UyeBilgiController);

    UyeBilgiController.$inject = ['$rootScope', '$scope', '$location', 'Uye', '$cookies'];

    function UyeBilgiController($rootScope, $scope, $location, Uye, $cookies) {

        Uye.getMemberInfo().then(function successCallback(response) {
            $rootScope.user = response.data;
            console.log("User: ", $scope.user);
        }, function errorCallback(response) {
            $scope.errorMessage = "Please try again later";
        });

        $scope.updateInfo = function() {
            console.log("Successfull update: ", $scope.user);
        };

        $scope.logout = function() {
            Uye.deleteAuthorizationCookie();
            $location.path('/');
        }
    }

    return module
});
