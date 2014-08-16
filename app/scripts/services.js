'use strict';
angular
    .module('keepApp').factory('StoreItem', function() {
        var items = {
            name: 'items'
        };
        return {
            add: function(title, notes, cb) {
                var newItem = {};
                newItem.title = title;
                newItem.note = notes;
                newItem.key = (new Date()).getTime();
                new Lawnchair(items, function(store) {
                    store.save(newItem, function() {
                        store.keys(function(keys) {
                            cb(keys);
                        });
                    });
                });
            },
            list: function(cb) {
                new Lawnchair(items, function(store) {
                    store.all(function(_items) {
                        cb(_items);
                    });
                });
            },
            get: function(key, cb) {
                new Lawnchair(items, function(store) {
                    store.get(key, cb);
                });
            }
        };
    });
