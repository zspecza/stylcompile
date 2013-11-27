;(function() {

  var app = angular.module('app', ['ngRoute', 'hljs']);

  app.config([
    '$routeProvider',
    '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      }).
      when('/:stylus', {
        templateUrl: 'templates/main.html',
        controller: 'LinkCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  }]);

  app.controller('MainCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

    $scope.stylus = "columns = 12\n$clearfix\n  *zoom: 1\n  &:before\n  " +
                    "&:after\n    content: ' '\n    display: table\n  " +
                    "&:after\n    clear: both\n.row\n  @extend " +
                    "$clearfix\nfor column, i in 1..columns\n  " +
                    ".col-{i + 1}\n    width: (100% / columns) * " +
                    "(i + 1)\n*[class*='col']\n  float: left\n  @media " +
                    "all and (max-width: 480px)\n    float: none\n    " +
                    "width: 100%";

    $scope.link = function() {
      $location.path('/' + $scope.stylus);
    };

    $scope.getData = function() {
      $http.post('/', { stylus: $scope.stylus })
        .success(function(data, status, headers, config) {
          if (data.error) {
            $scope.css = data.error.message;
          } else {
            $scope.css = data.css;
          }
        })
        .error(function(data, status, headers, config) {
          console.log(data);
        });
    };

    $scope.css = $scope.getData();

  }]);

  app.controller('LinkCtrl', ['$scope', '$http', '$routeParams', '$location',
    function($scope, $http, $routeParams, $location) {
      $scope.stylus = $routeParams.stylus;

      $scope.link = function() {
        $location.path('/' + $scope.stylus);
      };

      $scope.getData = function() {
        $http.post('/', { stylus: $scope.stylus })
          .success(function(data, status, headers, config) {
            if (data.error) {
              $scope.css = data.error.message;
            } else {
              $scope.css = data.css;
            }
          })
          .error(function(data, status, headers, config) {
            console.log(data);
          });
      };

      $scope.css = $scope.getData();

    }
  ]);

})();
