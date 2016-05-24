(function () {

    var marvelAPI = function($http) {

        var getComicById = function(id) {
            return $http.get("http://gateway.marvel.com/v1/public/comics/" + id + "?ts=5&apikey=eaf3d5a2c7c11a362ae20e48d03c1a3b&hash=d5ff4ebf6363c3af477f2f6a3d116622")
                .then(function(response) {
                    return response.data;
                });
        };

        var getNewReleases = function () {
            return $http.get("http://gateway.marvel.com/v1/public/comics?ts=5&apikey=eaf3d5a2c7c11a362ae20e48d03c1a3b&hash=d5ff4ebf6363c3af477f2f6a3d116622&format=comic&dateDescriptor=thisWeek")
                .then(function (response) {
                    return response.data;
                });
        };

        var getNewReleasesThisWeek = function () {
            return $http.get("http://gateway.marvel.com/v1/public/comics?ts=5&apikey=eaf3d5a2c7c11a362ae20e48d03c1a3b&hash=d5ff4ebf6363c3af477f2f6a3d116622")
                .then(function (response) {
                    return response.data;
                });
        };
        return {
            getComicById: getComicById,
            getNewReleases: getNewReleases,
            getNewReleasesThisWeek: getNewReleasesThisWeek
    };
    };


    var module = angular.module("ModuleName");
    module.factory("marvelAPI", marvelAPI);

}());