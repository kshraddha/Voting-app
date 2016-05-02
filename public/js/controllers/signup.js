angular.module('signup', []).controller('signupController', function ($scope, $http) {

  $scope.store = function (event) {
    event.preventDefault();
    var user, userExist;
    user = {
      username: $scope.username,
      email: $scope.email,
      password: $scope.password
    };
    userExist = {
      username: $scope.username,
      email: $scope.email
    };
    $http({
      method: 'POST',
      url: '/signup/validate',
      data: userExist
    }).then(function (res) {
      if (res.data === null) {
        $http({
          method: 'POST',
          url: '/signup',
          data: user
        }).then(function (res) {
          localStorage.setItem('curruser', $scope.username);
          window.location.assign('/');
        });
      } else if (res.data.username === $scope.username) {
        $scope.userExist = true;
      } else if (res.data.email === $scope.email) {
        $scope.emailExist = true;
      }
    });

  }
  $scope.submitted = false;
});