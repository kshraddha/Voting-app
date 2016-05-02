angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $routeProvider

  // home page
    .when('/', {
    templateUrl: 'views/polls.html',
    controller: 'pollsController'
  })

  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginController'
  })

  .when('/addpoll', {
    templateUrl: 'views/addpoll.html',
    controller: 'addpollController'
  })

  .when('/mypolls', {
    templateUrl: 'views/mypolls.html',
    controller: 'mypollsController'
  })

  .when('/signup', {
    templateUrl: 'views/signup.html',
    controller: 'signupController'
  })

  .when('/polldetails?:pollid', {
    templateUrl: 'views/polldetails.html',
    controller: 'detailController'
  })

  $locationProvider.html5Mode(true);

}]);