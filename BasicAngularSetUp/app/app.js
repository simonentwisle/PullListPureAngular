(function () {
    "use strict";

    var app = angular.module("ModuleName", ["ngRoute"]);

    app.config(function ($routeProvider) {

        $routeProvider
            .when("/main",
            {
                templateUrl: "Partials/homeView.html",
                controller: "HomeController"
            })
            .when("/comic/:id",
                {
                    templateUrl: "Partials/comicView.html",
                    controller: "ComicController"
                }
            )
        .otherwise({redirectTo:"/main"});

    });

})();