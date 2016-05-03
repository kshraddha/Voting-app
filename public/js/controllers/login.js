angular.module('login', []).controller('loginController', function ($scope, $http) {
  console.log($scope.userNotfound);
  $scope.check = function (event) {

    event.preventDefault();
    var username, password, userinfo, error;

    userinfo = {
      'username': $scope.username,
      'password': $scope.password
    }
    $http({
      method: 'POST',
      url: '/login',
      data: userinfo
    }).then(function (response) {
      $scope.loginForm.$submitted = false;
      if (response.data === null) {
        $scope.userNotfound = true;;
      } else if (response.data.password !== $scope.password) {
        $scope.incorrectPassword = true;;
      } else if (response.data.password === $scope.password) {
        localStorage.setItem('curruser', $scope.username);
        window.location.assign('/');
      }

    });
  }
});