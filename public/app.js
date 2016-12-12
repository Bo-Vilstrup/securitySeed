/**
 * Created by bo on 12/11/16.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'app.indexModule',
    'app.homeModule'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}]);

// .
// config(function ($httpProvider) {
//     $httpProvider.interceptors.push('authInterceptor');
// });