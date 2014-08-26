'use strict';

/**
 * @ngdoc function
 * @name keepApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the keepApp
 */
angular.module('keepApp')
  .controller('MainCtrl', function ($scope, keepNotes) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    
     //// Sticky Note related START      ///// 
    /* new note has the following properties 
    * note id (timestamp)
    * title 
    * description
    * toDoList : [{"item" : "", "status": ""},{"item" : "", "status": ""}]
    * images : [{"imageName":"", "content":""}]
    */

    $scope.newNote = {}; 
    $scope.keepNotesList = [];
    var NODE_ID_LIST = 'noteIdList';

    // returns the current local date & time
    $scope.generateNoteId = function(){
        var date = new Date();
     // var date =  (new Date).toLocaleFormat("%A, %B %e, %Y");  
      //alert(date);
      return date.getTime();
      
    };
    
    $scope.addNote = function(){
       // add the new id to the notes list in localstorage 
       // JSON.parse(localStorage.getItem("notesList"));
       var newNoteId = $scope.generateNoteId();
       $scope.newNote.id = newNoteId;
        // When the user creates a note for the first time noteidList is null 
        if(localStorage.getItem(NODE_ID_LIST) === null){
             $scope.noteIdList = []; 
        }else {
            var noteData = localStorage.getItem(NODE_ID_LIST);
            $scope.noteIdList = JSON.parse(noteData);
            
        }              
        //$scope.noteIdList = localStorage.getItem("noteIdList") || [];
        $scope.noteIdList.push(newNoteId);
        $scope.keepNotesList.push(JSON.parse(JSON.stringify($scope.newNote)));
        localStorage.setItem(NODE_ID_LIST,JSON.stringify($scope.noteIdList));
        localStorage.setItem(newNoteId, JSON.stringify($scope.newNote));
    };
    
    $scope.getAllNotes = function(){
        $scope.notesList = [];
        var noteIds = JSON.parse(localStorage.getItem(NODE_ID_LIST));
        for(var i=0;i<noteIds.length;i++){
           $scope.notesList.push(JSON.parse(localStorage.getItem(noteIds[i]) ));
        }
    };
    
    // Sticky Note related SEND // 
  })
  .service('keepNotes',[function($scope){
    var addNote, getNote, getAllNotes, searchNotes;

    addNote = function(){
    };

    getNote = function(){

    };
    getAllNotes = function(){

    };
    searchNotes = function(){

    }
    return {
      addNote: addNote,
      getNote: getNote,
      getAllNotes: getAllNotes,
      searchNotes: searchNotes
    }
  }]);
