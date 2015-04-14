var App = angular.module('RSSFeedApp', []);

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {  
  $scope.site = '';
  $scope.currentUrl='';
  $scope.saved = [
      
    ];
    
  $scope.loadFeed=function(e){
    $scope.currentUrl = $scope.site;
    var urlPrefix="http://";
    $scope.currentUrl = $scope.site.substr(7,$scope.site.length);
    console.log($scope.currentUrl);
    $scope.loading = true; 
    $scope.err = false;
    if($scope.site.substring(0,4)!=="http"){
      $scope.site = 'http://'+$scope.site;
    }
    
    Feed.parseFeed($scope.site+"/feed").then(function(res){
    $scope.feeds=res.data.responseData.feed.entries;
    if($scope.feeds!==undefined){
      $scope.loading = false;
      $scope.site = '';
      $scope.err = false;
    }
    else {
      $scope.err = false;
    }
    });

    if($scope.feeds===undefined){
      $scope.loading = false;
      $scope.err = true;
    }
  };

  $scope.arr = function(feed){
    for(var key in $scope.saved){
      if($scope.saved[key].title===feed.title){
        return;
      }
    }
    $scope.saved.push({title:feed.title, link: feed.link});
  };
}]);

App.factory('FeedService',['$http',function($http){
  return {
    parseFeed : function(url){
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  };
}]);