var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.controller('shipsController', ['$scope', '$http', '$location', '$routeParams', 'getIdService', '$route', function ($scope, $http, $location, $routeParams, getIdService, $route) {


    $scope.currentUrl = $route.current.templateUrl;
    console.log($scope.currentUrl);

    $scope.addUser = function () {
        var payload = {
            'name': $scope.username
        };

        $http.post('/users', payload).then(function (response) {
            console.log(response);
            $scope.username = '';
        });
        $scope.getUser();

    };

    $scope.addShip = function () {
        console.log(getIdService.id);
    };

    $scope.getUser = function () {
        // console.log('Tina the cat');
        $http.get('/users')
            .success(function (data) {
                $scope.userData = data;
            })
            .error(function (err) {});
    };

    //Get Single UserId
    $scope.getSingleUserId = function (data) {
        getIdService.id = data._id;
        console.log(getIdService.id);
    };

    //add ship to user
    $scope.addShip = function () {
        var id = getIdService.id;
        var payload = {
            'name': $scope.name,
            'missions': $scope.missions
        };
        $scope.name = '';
        $scope.missions = '';
        $http.put('/users/' + id + '/ships', payload).then(function (response) {
            console.log('success');
        });
    };

    $scope.deleteShip = function (data) {
        console.log(data);
        $http.delete('/ships/' + data)
            .success(function (data) {
                $scope.userData = data
            })
            .error(function (err) {});
        $scope.getUser();
    };

    $scope.editShip = function () {
        var ship = getIdService.currentShipId;
        var payload = {
            'name': $scope.editName,
            'missions': $scope.editMissions
        };
        console.log(ship._id);
        $http.put('/ships/' + ship._id, payload)
            .then(function (response) {});
    }

    $scope.getShipId = function (data) {
        getIdService.currentShipId = data;
        console.log(getIdService.currentShipId);
    }


}]); //myController