var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.controller('shipsController',['$scope', '$http', '$location', '$routeParams', 'getIdService', '$route', function($scope, $http, $location, $routeParams, getIdService, $route) {


  $scope.currentUrl = $route.current.templateUrl;
  console.log($scope.currentUrl);

  $scope.addUser = function(){
    var payload = {
      'name': $scope.username
    };

    $http.post('/users', payload).then(function(response){
      console.log(response);
      $scope.username = '';
    });
    $scope.getUser();

  };

$scope.addShip = function(){
  console.log(getIdService.id);
};

  $scope.getUser = function () {
    // console.log('Tina the cat');
   $http.get('/users')
    .success(function(data) {
     $scope.userData = data;
    })
    .error(function(err) {
    });
  };

//Get Single UserId
  $scope.getSingleUserId = function (data) {
   getIdService.id = data._id;
   console.log(getIdService.id);
  };

//add ship to user
 $scope.addShip = function(){
    var id = getIdService.id;
    var payload = {
      'name': $scope.name,
      'missions': $scope.missions
    };
    $scope.name = '';
    $scope.missions = '';
    $http.put('/users/' + id + '/ships', payload).then(function(response){
      console.log('success');
    });
  };


}]);//myController

