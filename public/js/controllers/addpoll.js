var app = angular.module('addpoll', []);
app.directive("deleteOpt", function () {
  return {
    restrict: 'A',
    link: function ($scope, element, attribute) {

      element.on('click', function () {
        var i;
        event.preventDefault();
        $('#poll-option-div-' + event.target.id + '').remove();
        var a = parseInt(event.target.id);
        var b = $('#poll-options div').length;
        for (i = a + 1; i < b + 2; i++) {
          $('#poll-option-div-' + i + '').attr('id', 'poll-option-div-' + (i - 1) + '');
          $('#poll-option-' + i + '').attr('ng-model', 'ng' + (i - 1) + '');
          $('#poll-option-' + i + '').attr('id', 'poll-option-' + (i - 1) + '');
          $('#' + i + '').attr('id', '' + (i - 1) + '');
        }
      });
    }
  };
});



app.directive("addOpt", function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, element, attribute) {

      element.on('click', function () {
        var res = angular.element($('#poll-options')).append($compile('<div class="form-group" id="poll-option-div-' + ($('#poll-options input').length + 1) + '"><input class="opt-input form-control" id="poll-option-' + ($('#poll-options input').length + 1) + '" name="polloptInput" ng-model="ng' + ($('#poll-options input').length + 1) + '" type="text" placeholder="" required><button delete-opt type="button"  class="btn btn-danger opt-delete" id="' + ($('#poll-options input').length + 1) + '">X</button></div>')(scope));
        scope.$apply();
      })
    }
  }
});


app.controller('addpollController', function ($scope, $http) {

  var twoOptions, dupOptions, inputArray, pollOption, item, newPoll, submitted, emptyOpt;
  inputArray = [];
  twoOptions = false;
  dupOptions = false;
  submitted = false;
  emptyOpt = false;

  $scope.mintwoOpt = function () {
    if (submitted === true) {
      if ($('#poll-options input').length < 2) {
        twoOptions = true;
        return true;
      } else {
        return false;
      }
    }
  }

  $scope.duplicateOpt = function () {
    if (submitted === true) {
      for (i = 0; i < $('#poll-options div').length; i++) {
        inputArray[i] = $('#poll-option-' + (i + 1) + '').val();
      }
      inputArray.sort();
      for (i = 0; i < inputArray.length; i++) {
        if (inputArray[i] !== '' && inputArray[i] === inputArray[i + 1]) {
          dupOptions = true;
          return true;
          break;
        } else {
          return false;
        }
      }
    }
  }

  $scope.emptyOpt = function () {
    for (i = 0; i < $('#poll-options div').length; i++) {
      inputArray[i] = $('#poll-option-' + (i + 1) + '').val();
    }
    for (i = 0; i < inputArray.length; i++) {
      if (inputArray[i] === '' && submitted === true) {
        emptyOpt = true;
        return true;
        break;
      }
    }
  }

  $scope.init = function () {
    submitted = true;
    dupOptions = false;
    twoOptions = false;
    emptyOpt = false;
  }

  $scope.addpoll = function () {
    if (twoOptions === false && dupOptions === false && emptyOpt === false) {
      pollOption = [];
      for (i = 0; i < $('#poll-options div').length; i++) {
        item = {
          'pollOpt': $('#poll-option-' + (i + 1) + '').val(),
          'count': 0
        };
        pollOption.push(item);
      }
      newPoll = {
        'username': localStorage.getItem('curruser'),
        'pollName': $('#poll-name').val(),
        'pollOptions': pollOption
      }
      $http({
        method: 'POST',
        url: '/addpoll',
        data: newPoll
      }).then(function (response) {
        window.location.assign('/');

      });
    }
  }

});