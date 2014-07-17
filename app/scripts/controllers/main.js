'use strict';

/**
 * @ngdoc function
 * @name keepApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the keepApp
 */
angular.module('keepApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
