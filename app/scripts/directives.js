'use strict';
angular
    .module('keepApp')
    .directive('test1', function() {
        return {
            templateUrl: 'views/test1.html',
            controller: function($scope) {
                $scope.saveName = function() {
                    console.log("Saving name of value:" + $scope.name);
                };
            }
        };
    });
