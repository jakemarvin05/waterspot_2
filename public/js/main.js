/**
 * Created by techticsninja on 7/21/16.
 */

var mainApp = angular.module('waterspotApp', []);

mainApp.factory('users', function($http) {
    var doRequest = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:2999/api/users'
        });
    };

    return {
        programs: function() { return doRequest(); }
    };
});

mainApp.controller('usersController', function($scope, users) {
    users.programs()
        .success(function(data, status) {
            console.log(data);
        })
});