"use strict";angular.module("keepApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("keepApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.newNote={},a.notesList=[];var b="noteIdList";a.generateNoteId=function(){var a=new Date;return a.getTime()},a.addNote=function(){var c=a.generateNoteId();if(a.newNote.id=c,null===localStorage.getItem(b))a.noteIdList=[];else{var d=localStorage.getItem(b);a.noteIdList=JSON.parse(d)}a.noteIdList.push(c),localStorage.setItem(b,JSON.stringify(a.noteIdList)),localStorage.setItem(c,JSON.stringify(a.newNote))},a.getAllNotes=function(){a.notesList=[];for(var c=JSON.parse(localStorage.getItem(b)),d=0;d<c.length;d++)a.notesList.push(JSON.parse(localStorage.getItem(c[d])))}}]),angular.module("keepApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);