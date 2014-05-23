'use strict';

/* Controllers */
var app = angular.module('myApp.controllers', []);

app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

app.controller('POCController', function($scope, $rootScope, $http, data) {
    var authPromise = data.getAuthByUser({}, function(response){
        $scope.authByUser = response;    
    }, function(){});
    var usagePromise = data.getTodayUsageStats({}, function(response){
        $scope.todayUsage = response;
        console.log(response);
    }, function(){});
});
