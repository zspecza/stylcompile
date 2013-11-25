function MainCtrl($scope, $http) {

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

}
