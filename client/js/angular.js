var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.controller('shipsController', ['$scope', '$http', '$location', '$routeParams', 'getIdService', '$route', function ($scope, $http, $location, $routeParams, getIdService, $route) {


    $scope.currentUrl = $route.current.templateUrl;
    //    console.log($scope.currentUrl);

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

    $scope.getSingleUserId = function (data) {
        getIdService.id = data._id;
        getIdService.editUsername = data.name;
    }


    $scope.getUser = function () {
        // console.log('Tina the cat');
        $http.get('/users')
            .success(function (data) {
                $scope.userData = data;
            })
            .error(function (err) {});
    };

    //Get Single ShipId
    $scope.getShipId = function (data) {

        getIdService.currentShipId = data._id;
        getIdService.placeHolderName = data.name;
        getIdService.placeHolderMissions = data.missions;
        //        console.log(getIdService.currentShipId);
    };

    $scope.shipName = getIdService.placeHolderName;
    $scope.shipMissions = getIdService.placeHolderMissions;
    $scope.editUsername = getIdService.editUsername;


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
        console.log(ship);
        var payload = {
            'name': $scope.shipName,
            'missions': $scope.shipMissions
        };
        console.log(ship._id);
        $http.put('/ships/' + ship, payload)
            .then(function (response) {});
    }

    $scope.editUser = function () {
        var user = getIdService.id;
        console.log(user);
        var payload = {
            'name': $scope.editUsername
        };
        $http.put('/users/' + user, payload)
            .then(function (response) {});
    }


}]);