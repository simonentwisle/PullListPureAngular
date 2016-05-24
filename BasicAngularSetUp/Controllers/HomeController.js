(function () {
    "use strict";

    angular
        .module("ModuleName")
        .controller("HomeController",homeController);

    function homeController($scope, marvelAPI) {

        $scope.comics = [];

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