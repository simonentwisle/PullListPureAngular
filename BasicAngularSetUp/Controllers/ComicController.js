(function () {
    "use strict";

    angular
        .module("ModuleName")
        .controller("ComicController", comicController);

    function comicController($scope, $routeParams, marvelAPI) {

        $scope.comics = [];

        function truncate(string) {
            if (string.length > 100)
                return string.substring(0, 100) + '...';
            else
                return string;
        };



        ////////// Comic Model /////////////
        // {
        //      id: int,
        //      title: "title",
        //      thumbnail:  { 
        //                      path: "http://pathToThumbnail,
        //                      extension: ".jpg"
        //                  }
        //      creators : {
        //                         editors: {   
        //                                  resourceURI: "http://gateway.marvel.com/v1/public/creators/11737",
        //                                  name: "Daniel Ketchum", 
        //                                  role: "editor"
        //                             } ,
        //                         writers: {   
        //                                  resourceURI: "http://gateway.marvel.com/v1/public/creators/11737",
        //                                  name: "Daniel Ketchum", 
        //                                  role: "editor"
        //                             } ,
        //                         artists: {   
        //                                  resourceURI: "http://gateway.marvel.com/v1/public/creators/11737",
        //                                  name: "Daniel Ketchum", 
        //                                  role: "editor"
        //                             } ,
        //                         pencillers: {   
        //                                  resourceURI: "http://gateway.marvel.com/v1/public/creators/11737",
        //                                  name: "Daniel Ketchum", 
        //                                  role: "editor"
        //                             } ,
        //                 }
        //              description: "The description of the story"
        // }

       
        var formatCreators = function(creatorsArray) {
            var editors = [];
            var writers = [];
            var artists = [];
            var pencillers = [];

            for (var key in creatorsArray) {
                if (!creatorsArray.hasOwnProperty(key)) continue;
                if (key === "items") {
                    var theItems = creatorsArray[key];
                    for (var i = 0; i < theItems.length; i++) {
                        switch (theItems[i].role) {
                            case "editor":
                                editors.push(theItems[i]);
                                break;
                            case "writer":
                                writers.push(theItems[i]);
                                break;
                            case "artist":
                                artists.push(theItems[i]);
                                break;
                            case "penciller":
                                pencillers.push(theItems[i]);
                                break;
                            default:
                        }
                    }
                }
            }

            var formattedCreators = {
                editors: editors,
                writers: writers,
                artists: artists,
                pencillers:pencillers
            }
            return formattedCreators;
        }

        var loadComic = function () {
            var theData = $scope.theComic.data.results;

            for (var key in theData) {
                if (!theData.hasOwnProperty(key)) continue;
                var obj = theData[key];
                var theCreators = formatCreators(obj.creators);
                var comic = {
                    title: obj.title,
                    id: obj.id,
                    thumbnail: obj.thumbnail,
                    creators: theCreators,
                    descriptionShort: truncate(obj.description),
                    descriptionLong: obj.description
                }
                $scope.comics.push(comic);
                $scope.comics = $scope.comics;
            }
        };

        var comicId = $routeParams.id;

        var onLoadComicComplete = function (data) {
            $scope.theComic = data;
            loadComic();
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data";
        }

        marvelAPI.getComicById(comicId)
        .then(onLoadComicComplete, onError);
    };

})();