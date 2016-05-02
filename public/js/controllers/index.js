var app = angular.module('index', []);

app.controller('indexController', function ($scope, $http) {

  $scope.curruser = localStorage.getItem('curruser');
  if ('curruser' in localStorage) {
    $scope.container = 'views/usercontainer.html';
  } else {
    $scope.container = 'views/newcontainer.html';
  }

  $scope.userLoggedin = function () {
    if ('curruser' in localStorage) {
      return true;
    } else {
      return false;
    }
  }

  $scope.logout = function () {
    localStorage.removeItem('curruser');
    window.location.assign('/');
  }
});