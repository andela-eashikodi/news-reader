var App = angular.module('RSSFeedApp', []);

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {  
  $scope.dd = 'http://';
    $scope.loadFeed=function(e){   
      Feed.parseFeed($scope.dd).then(function(res){
        // $scope.loadButonText=angular.element(e.target).text();
        $scope.feeds=res.data.responseData.feed.entries;
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