'use strict';
angular
    .module('keepApp')
    .directive('kpMainInput', ['$timeout', 'StoreItem',
        function($timeout, StoreItem) {
            var saveItem = function(scope) {
                scope.editmode = false;
                if (scope.note || scope.title) {
                    StoreItem.add(scope.title, scope.note, function() {
                        StoreItem.list(function(_items) {
                            scope.items = _items;
                        });
                    });
                }

            };
            return {
                restrict: 'AE',
                templateUrl: 'views/main-input.html',
                link: function(scope, elem) {
                    scope.editmode = false;
                    scope.edit = function() {
                        scope.editmode = true;
                        scope.title = '';
                        scope.note = '';
                        $timeout(function() {
//TODO: See what can we do to remove this jquery call here 
                            $('.expanding').expanding();
                            elem.find('textarea')[0].focus();
                        });
                    };
                    scope.addNote = function() {
                        saveItem(scope);
                    };
                    elem.on('keyup', function(event) {
                        if (event.keyCode === 27) {
                            saveItem(scope);
                            scope.$apply();
                        }
                    });
                }
            };
        }
    ])
    .directive('kpItemList', ['StoreItem',
        function(StoreItem) {
            return {
                restrict: 'AE',
                templateUrl: 'views/list-items.html',
                link: function(scope) {
                    StoreItem.list(function(_items) {
                        scope.items = _items;
                        // scope.$apply();
                    });
                }
            };
        }
    ])
    .directive('kpItem', ['StoreItem',
        function(StoreItem) {
            return {
                scope: {},
                restrict: 'AE',
                templateUrl: 'views/item.html',
                link: function(scope, elems, attrs) {
                    var key = attrs.id;
                    StoreItem.get(key, function(obj) {
                        scope.item = obj;
                    });
                }
            };
        }
    ]);
