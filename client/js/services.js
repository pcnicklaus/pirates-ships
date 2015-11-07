//Services
app.service('getIdService', function () {

    this.id = "No ID Yet";

    this.currentShipId = "nothing yet";

    this.editUsername = "nothing yet";
    this.placeHolderName = 'nothing yet';
    this.placeHolderMissions = 'nothing yet';

});

app.service('pirateTranslateService', ['$resource', function ($resource) {

    this.translateRequest = function (payload) {

        var pirateAPI = $resource('http://isithackday.com/arrpi.php?text=' + payload + '&format=jsonp', {
            callback: 'JSON_CALLBACK'
        }, {
            get: {
                method: 'JSONP'
            }
        });
        return pirateApi.get({
            payload: payload
        });
    }
        }]);