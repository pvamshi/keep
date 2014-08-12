'use strict';
angular
    .module('keepApp')
    .directive('test1', function() {
        return {
            templateUrl: 'views/test1.html',
            controller: function($scope) {
                $scope.saveName = function() {
                    console.log('Saving name of value:' + $scope.name);
                };
            }
        };
    })
    
    // Template Driven Directive 
    .directive('keepImageUpload', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/imageUpload.html',
            controller: function($scope) {
                $scope.onDrag = function() {
                    console.log('onDrag');
                };
            }
        };
    })
    
    // Directive that Adds events to an element 
    .directive('keepFileDrop', ['$document', '$parse',function($document,$parse){
         return function(scope, element, attr) {
             //define events on element 
             scope.fileCount = 0;
             scope.files = [];
             element[0].addEventListener("dragover", function(evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        
                }, false);
                element[0].addEventListener("dragenter", function(evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                }, false);
               
            // Drop event that will will be called when a file is dropped on a element that has this directive (refer imageUpload.html for usage)
             element[0].addEventListener("drop", function(evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        //elem.removeClass(elem[0].__drag_over_class_);
                        //elem[0].__drag_over_class_ = null;
                        extractFiles(evt);
                }, false);
                
             // reads the file dropped on the element and reads the content, create img tag that renders the image. Only image/png files are accepted.
             function extractFiles(evt) {
                        var files = [], fileUrls = [], items = evt.dataTransfer.items;
                        var fileList = evt.dataTransfer.files;
                        if (fileList != null) {
                                for (var i = 0; i < fileList.length; i++) {
                                        // check fileList.item(i).type if it is  png, jpeg
                                        if(fileList.item(i).type == 'image/png' || fileList.item(i).type == 'image/jpeg'){
                                            files.push(fileList.item(i));
                                             if (typeof FileReader !== "undefined") {
                                                        var img = document.createElement("img");
                                                        img.style.cssText = "height:300px;width:350px;";
                                                       // img.style.height = "300 px";
                                                        //img.style.width = "300 px"
                                                        //console.log(element);
                                                        element[0].parentNode.appendChild(img);
                                                        var reader = new FileReader();
                                                        reader.onload = (function (theImg) {
                                                                return function (evt) {
                                                                theImg.src = evt.target.result;
                                                                };
                                                        }(img));
                                                        reader.readAsDataURL(fileList.item(i));
                                            }
                                         
                                        }
                                }
                        }
                        // adding files object to scope 
                        scope.files = files;
                        scope.fileCount = files.length;
                        scope.$apply();
            } // end of extractFiles
             
         } //end of return     
    }]);

