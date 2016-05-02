var app = angular.module('mypolls', []);

app.directive("getMyPolls", function ($compile, $http) {

  return {
    restrict: 'A',
    replace: true,
    link: function (scope, element, attribute) {
      var i, user, userobj;
      user = localStorage.getItem('curruser');
      userobj = {
        'username': user
      };
      $http({
        method: 'POST',
        url: '/mypolls',
        data: userobj
      }).then(function (response) {
        for (i = 0; i < response.data.length; i++) {
          $(element).append('<li class="list-group-item" id="li' + response.data[i]._id + '"><a href="polldetails?pollid=' + response.data[i]._id + '" class="poll-option">' + response.data[i].pollName + '</a><button type="button" class="btn btn-xs btn-danger delete-opt-btn" delete-poll id="' + response.data[i]._id + '">X</button></li>');
        }
        $compile(element.contents())(scope);
      });

    }
  }

});

app.controller('mypollsController', function ($scope, $http) {

});

app.directive('deletePoll', function () {
  return {
    restrict: 'A',
    link: function ($scope, element, attribute) {
      var id, idobj;
      element.on('click', function (event) {
        id = event.target.id;
        idobj = {
          _id: id
        }
        console.log(id);
        $.ajax({
          type: 'POST',
          url: '/mypolls/delete/polls',
          data: idobj
        }).done(function (response) {
          $('#li' + id + '').remove();
        });

      })
    }
  };
});