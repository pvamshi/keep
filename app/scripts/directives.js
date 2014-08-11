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
    
    
    .directive('keepFileDrop', ['$document', '$parse',function($document,$parse){
                 return function(scope, element, attr) {
                     //define events on element 
                     scope.fileCount = 0;
                     element[0].addEventListener("dragover", function(evt) {
				evt.stopPropagation();
				evt.preventDefault();
				
			}, false);
			element[0].addEventListener("dragenter", function(evt) {
				evt.stopPropagation();
				evt.preventDefault();
			}, false);
			/*element[0].addEventListener("dragleave", function(evt) {
				leaveTimeout = $timeout(function() {
					elem.removeClass(elem[0].__drag_over_class_);
					elem[0].__drag_over_class_ = null;
				}, attr['ngFileDragOverDelay'] || 1);
			}, false);
                     */
                     
                     
                     
                    // var fn = $parse(attr['keepFileDrop']);
                     var fn = $parse( attr.$attr['keepFileDrop']);
                     element[0].addEventListener("drop", function(evt) {
				evt.stopPropagation();
				evt.preventDefault();
				//elem.removeClass(elem[0].__drag_over_class_);
				//elem[0].__drag_over_class_ = null;
				extractFiles(evt);
			}, false);
                        
                        
                        
                        
                        function extractFiles(evt) {
				var files = [], fileUrls = [], items = evt.dataTransfer.items;
                                var fileList = evt.dataTransfer.files;
                                if (fileList != null) {
                                        for (var i = 0; i < fileList.length; i++) {
                                                // check fileList.item(i).type if it is  png, jpeg
                                                if(fileList.item(i).type == 'image/png' || fileList.item(i).type == 'image/jpeg'){
                                                 files.push(fileList.item(i));
                                                 console.log(fileList.item(i));
                                                 
                                                 
                                                     if (typeof FileReader !== "undefined") {
                                                            var img = document.createElement("img");
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
                                                 //fileUrls.push(fileList.item(i).fullPath);
                                                }
                                        }
                                }
				//callback(files);
                                scope.files = files;
                                scope.$apply();
                                
                                
			} // end of extractFiles
                     
                 } //end of return     
    }]);

