'use strict';

/**
 * @ngdoc function
 * @name keepApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the keepApp
 */
angular.module('keepApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
