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

    // Directive that Manipulates the DOM - create Img tags 
    .directive('keepPreviewImages', [ function() {

    function link(scope, element, attrs) {
      function generatePreviewImg() {
        //element.text(dateFilter(new Date(), format));
        if (typeof FileReader !== "undefined") {
            var filesArr = scope.files;
            if(filesArr){
                while (element[0].firstChild) {
                    element[0].removeChild(element[0].firstChild);
                }
                for (var i = 0; i < filesArr.length; i++) {
                    var img = document.createElement("img");
                   // img.style.cssText = "height:300px;width:350px;";
                    img.className = "imgPreview"; 
                    element[0].appendChild(img);
                    var reader = new FileReader();
                    reader.onload = (function (theImg) {
                            return function (evt) {
                            theImg.src = evt.target.result;
                            };
                    }(img));
                    reader.readAsDataURL(scope.files[i]);
                }
            }
            
        }
      }

      scope.$watch('files', function(value) {
        generatePreviewImg();
      });
    }

    return {
      link: link
    };
  }])
     // END manipulate DOM
    
    // Directive that Adds events to an element 
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
                                             /*if (typeof FileReader !== "undefined") {
                                                        var img = document.createElement("img");
                                                       // img.style.cssText = "height:300px;width:350px;";
                                                        img.className = "imgPreview"; 
                                                        element[0].parentNode.appendChild(img);
                                                        var reader = new FileReader();
                                                        reader.onload = (function (theImg) {
                                                                return function (evt) {
                                                                theImg.src = evt.target.result;
                                                                };
                                                        }(img));
                                                        reader.readAsDataURL(fileList.item(i));
                                            }*/
                                         
                                        }
                                }
                        }
                        // adding files object to scope 
                        var previousFiles = scope.files;
                        if(previousFiles) {
                          files = files.concat(previousFiles);
                        }
                        scope.files = files;
                        scope.fileCount = files.length;
                        scope.$apply();
            } // end of extractFiles
             
         } //end of return     
    }])    
    .directive('keepToolBar', function() {
        return {
            restrict: 'AE',
            templateUrl: 'views/KeepToolBar.html',
            transclude: true,
            link: function(scope, element, attrs) {
                //Makes the notes to list view
                $( ".toolbar-menu-button .list-view" ).on("click", function(){

                });

                //Makes the notes to grid view
                $( ".toolbar-menu-button .grid-view" ).on("click", function(){

                })
            },
        };
    })
    .directive('keepToolBarMenu', function() {
        return {
            restrict: 'AE',
            templateUrl: 'views/KeepToolBarMenu.html',
            transclude: true,
            link: function(scope, element, attrs) {
                
            },
        };
    })
    .directive('keepAddNote', ['keepNotes', function(keepNotes) {
        var _keepNotes = keepNotes;
        return {
            restrict: 'AE',
            templateUrl: 'views/KeepAddNote.html',
            keepNotes: _keepNotes,
            transclude: true,
            link: function(scope, element, attrs) {
                scope.addingNotes = false;
                element.on('click', function( eventObject ){
                    var srcElement = eventObject.target;
                });
                scope.openEditor = function(){
                    scope.addingNotes = true;
                    //angular.element(".keep-notes-options").addClass("keep-notes-options-all").removeClass("keep-notes-options");
                };
                scope.addNote =function(){
                }
            },
        };
    }]);

