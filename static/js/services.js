'use strict';

/* Services */
var app = angular.module('myApp.services', []);
app.service('data', function($http) {
   return {
        getData: function(query, callback, error) {
             //return the promise directly.
             return $http.post('/getData')
                       .then(function(result) {
                            //resolve the promise as the data
                            callback(result.data)
                        });
        },
        testViz: function(query, callback, error){
            return $http.post('/testViz').then(function(data){callback(data.data)});    
        },
        getAuthByUser: function(query, callback, error){
            return $http.post('/authByUser').then(function(data){callback(data.data)});
        },
        getTodayUsageStats: function(query, callback, error){
            return $http.post('/usageStats').then(function(data){callback(data.data)});
        }
   }
});
