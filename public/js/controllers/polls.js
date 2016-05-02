var app = angular.module('polls', []);

app.controller('pollsController', function ($scope, $http) {

  var i;
  $http({
    method: 'POST',
    url: '/polls'
  }).then(function (response) {
    for (i = 0; i < response.data.length; i++) {
      $('.get-polls ul').append('<li><a href="polldetails?' + response.data[i]._id + '" class="poll-option " id="' + response.data[i]._id + '">' + response.data[i].pollName + '</a></li>');
    }
  });
});