﻿(function () {
    "use strict";

    angular
        .module("ModuleName")
        .controller("HomeController",homeController);

    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }

    function homeController($scope, marvelAPI) {


        alert(document.documentElement.clientWidth);
        $scope.comics = [];

        var numberOfComicsToReturnInAChunk = 4;

        if (document.documentElement.clientWidth <= 885) {
            numberOfComicsToReturnInAChunk = 3;
        }

        if (document.documentElement.clientWidth <= 668) {
            numberOfComicsToReturnInAChunk = 2;
        }

        var loadComics = function () {
            var theData = $scope.newReleases.data.results;

            for (var key in theData) {

                // skip loop if the property is from prototype
                if (!theData.hasOwnProperty(key)) continue;
                var obj = theData[key];
                var comic = {
                    title: obj.title,
                    id: obj.id,
                    thumbnail: obj.thumbnail,
                    creators: obj.creators
                }
                $scope.comics.push(comic);
                $scope.comics = $scope.comics;
            }
            $scope.chunkedData = chunk($scope.comics, numberOfComicsToReturnInAChunk);
        };

        var onLoadComisComplete = function (data) {
            $scope.newReleases = data;
            loadComics();
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data";
        }

        ////////// Comic Model /////////////
        // {
        //      id: int,
        //      title: "title",
        //      thumbnail:  { 
        //                      path: "http://pathToThumbnail,
        //                      extension: ".jpg"
        //                  }
        //      creators : {
        //                      available: int,
        //                      items: {   
        //                                  resourceURI: "http://gateway.marvel.com/v1/public/creators/11737",
        //                                  name: "Daniel Ketchum", 
        //                                  role: "editor"
        //                             } 
        //                 }
        // }

       
        marvelAPI.getNewReleases()
        .then(onLoadComisComplete, onError);

        

    };
})();