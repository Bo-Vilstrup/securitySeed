/**
 * Created by bo on 12/11/16.
 */
'use strict';

//angular.module('myApp.view1', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
angular.module('app.indexModule' ,['ngRoute'])

    // .config(['$routeProvider', function ($routeProvider) {
    //     $routeProvider.when('/', {
    //
    //         templateUrl: 'views/home/home.html',
    //         controller: 'homeController',
    //         controllerAs: 'ctrl'
    //     });
    // }])

    .controller('indexController', function ($http, $scope) {


        alert("hey indexController");

    }); // End of Controller