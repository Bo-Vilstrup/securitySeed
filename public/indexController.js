/**
 * Created by bo on 12/11/16.
 */
'use strict';

//angular.module('myApp.view1', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
angular.module('app.indexModule' ,['ngRoute', 'ngStorage'])
    .controller('indexController', function ($http, $scope, $localStorage) {



        $scope.login = function () {
            $http({
                method: 'post',
                url: '/signin',
                data: {"userName": $scope.userName, "password": $scope.password}
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                alert(response.data.token);
                $localStorage.token = response.data.token;

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

            });
            
        };
        
        $scope.logout = function () {
            
        };




    }); // End of Controller