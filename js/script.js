var App = angular.module('RSSFeedApp', []);

$(document).ready(function(){
    Feed.parseFeed("http:vanguardngr.com/feed").then(function(res){
    $scope.feeds=res.data.responseData.feed.entries;});
});

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {  
  $scope.site = '';
  $scope.currentUrl='';
  $scope.saved = [];
  $scope.allfeed = [
    // {name:"punchng.com",link:"http://punchng.com/feed"}
  ];

  $scope.loadFeed=function(e){
    $scope.currentUrl = $scope.site;
    // console.log(e);
    $scope.loading = true; 
    $scope.err = false;
    if($scope.site.substring(0,4)!=="http"){
      $scope.site = 'http://'+$scope.site;
    }
    $scope.currentUrl = $scope.site.substr(7,$scope.site.length);

    Feed.parseFeed($scope.site+"/feed").then(function(res){
    $scope.feeds=res.data.responseData.feed.entries;
    $scope.loading = false;
    $scope.site = '';
    $scope.err = false;
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

  $scope.news = function(itemadd){
    // console.log(itemadd);
    for(var key in $scope.allfeed){
      if($scope.allfeed[key].name===itemadd){
        return;
      }
    }
    $scope.allfeed.push({name:itemadd, link: "http://"+itemadd+".com/feed"});
  };

}]);

App.factory('FeedService',['$http',function($http){
  return {
    parseFeed : function(url){
      console.log(url);
      console.log(encodeURIComponent(url));
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  };
}]);