;(function() {

  // define main app module object
  var app = angular.module('app', ['ngRoute', 'hljs']);

  // configure routes
  app.config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {

      $routeProvider.
        // root (index) route
        when('/', {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        }).
        // link (stylus code) route
        when('/:stylus', {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });

      // enable HTML5 pushState() for fancy URLs and set the route
      // to a hashbang (/#!/) for older legacy browsers
      $locationProvider.html5Mode(true).hashPrefix('!');

    }
  ]);

  app.controller('MainCtrl', ['$scope', '$http', '$routeParams', '$location',
    function($scope, $http, $routeParams, $location) {

      // is there Stylus code in the URL?
      if ($routeParams.stylus) {
        // there is - let's set the stylus model to it
        $scope.stylus = $routeParams.stylus;
      } else {
        // there isn't - let's set some boilerplate code
        $scope.stylus = "columns = 12\n$clearfix\n  *zoom: 1\n  &:before\n  " +
                        "&:after\n    content: ' '\n    display: table\n  " +
                        "&:after\n    clear: both\n.row\n  @extend " +
                        "$clearfix\nfor column, i in 1..columns\n  " +
                        ".col-{i + 1}\n    width: (100% / columns) * " +
                        "(i + 1)\n*[class*='col']\n  float: left\n  @media " +
                        "all and (max-width: 480px)\n    float: none\n    " +
                        "width: 100%";
      }

      // this function will get called when the link button is clicked
      // it updates the path to contain stylus code which then gets
      // set as the stylus model
      $scope.link = function() {
        $location.path('/' + $scope.stylus);
      };

      // this occurs on keyup, it sends the stylus to the server
      // which then returns the compiled CSS via ajax
      $scope.getData = function() {

        $http.post('/', { stylus: $scope.stylus })
        .success(function(data, status, headers, config) {

          // was there a compilation error?
          if (data.error) {
            // better show the user then!
            $scope.css = data.error.message;
          } else {
            // the stylus compiled perfectly, let's set the CSS to the result
            $scope.css = data.css;
          }

        })
        // errors should probably be handled a little better here...
        .error(function(data, status, headers, config) {
          console.log(data);
        });

      };

      // let's initialize a CSS preview by calling getData once to compile
      // the boilerplate Stylus code we defined earlier
      $scope.css = $scope.getData();

    }

  ]);

})();
