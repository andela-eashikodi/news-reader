var App = angular.module('RSSFeedApp', []);

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {  
  $scope.site = 'http://';
  $scope.saved = [
      {title: "first"},
      {title: "second"}
    ];
    $scope.loadFeed=function(e){
    $scope.loading = true; 
    $scope.err = false;
    if($scope.site.substring(0,4)!=="http"){
      $scope.site = 'http://'+$scope.site;
    }
    
    Feed.parseFeed($scope.site+"/feed").then(function(res){
    $scope.feeds=res.data.responseData.feed.entries;
    if($scope.feeds!==undefined){
      $scope.loading = false;
      // $scope.site = '';
      $scope.err = "false";
    }
    });

    if($scope.feeds===undefined){
      $scope.loading = "false";
      $scope.err = true;
    }
    };

    $scope.arr = function(){
      $scope.saved.push({title:$scope.title});
    };

}]);

App.factory('FeedService',['$http',function($http){
  return {
    parseFeed : function(url){
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  };
}]);