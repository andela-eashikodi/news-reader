var App = angular.module('RSSFeedApp', []);

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {  
  $scope.site = 'http://';
    $scope.loadFeed=function(e){
    $scope.loading = true; 
    if($scope.site.substring(0,4)!=="http"){
      console.log($scope.site.substring(0,4));
      $scope.site = 'http://'+$scope.site;
    }

      Feed.parseFeed($scope.site+"/feed").then(function(res){
        
        $scope.site = '';
        $scope.feeds=res.data.responseData.feed.entries;
        if($scope.feeds!==undefined){
          $scope.loading = false;
        }
        else if($scope.feeds===undefined){
          alert("Couldn't locate feed for "+ $scope.site);
        }
      });

      
    };
}]);

App.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    };
}]);