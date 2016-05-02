var app = angular.module('polldetails', []);

app.controller('detailController', function ($scope, $http, $compile) {

  var id, pollid, i, votedOption, info, userVoteInfo, count, pollOptionNames, countData, pollLabels, r, g, b, c, h, backgroundColor, color, hcolor, hoverColor, myChart, ctx, countInc, index, userVoted;

  count = [];
  pollOptionNames = [];
  color = [];
  hcolor = [];
  id = window.location.search.substring(1);
  pollid = {
    'id': id
  }

  $http({
    method: 'POST',
    url: '/polldetails',
    data: pollid
  }).then(function (response) {
    $('#poll-name').append(response.data.pollName);
    for (i = 0; i < response.data.pollOptions.length; i++) {
      $('#poll-options').append('<div class="radio"><label><input class="poll-option" type="radio" ng-model="ngPollOpt" name="poll-option-name" value="' + response.data.pollOptions[i].pollOpt + '">' + response.data.pollOptions[i].pollOpt + '</label></div>');


      pollOptionNames.push(response.data.pollOptions[i].pollOpt);
      count.push(response.data.pollOptions[i].count);
      r = Math.floor(Math.random() * 200);
      g = Math.floor(Math.random() * 200);
      b = Math.floor(Math.random() * 200);
      c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      h = 'rgb(' + (r + 20) + ', ' + (g + 20) + ', ' + (b + 20) + ')';
      color.push(c);
      hcolor.push(h);
    }
    countData = JSON.stringify(count);
    pollLabels = JSON.stringify(pollOptionNames);
    backgroundColor = JSON.stringify(color);
    hoverColor = JSON.stringify(hcolor);
    ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: JSON.parse(pollLabels),
        datasets: [{
          data: JSON.parse(countData),
          backgroundColor: JSON.parse(backgroundColor),
          hoverBackgroundColor: JSON.parse(hoverColor)
    	}]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 20
          }
        },
        responsive: false
      }
    });
    // document.getElementById('js-legend').innerHTML = myChart.generateLegend();
  });
  userVoteInfo = {
    'pollId': id,
    'username': localStorage.getItem('curruser')
  }

  function findUserVote() {
    if ('curruser' in localStorage) {
      $http({
        method: 'POST',
        url: '/findUserVote',
        data: userVoteInfo
      }).then(function (resp) {
        if (resp.data !== null) {
          $('#vote-submit').attr('disabled', 'true');
          $('#one-vote').css('display', 'block');
        }
      });
    } else {
      $('#vote-submit').attr('disabled', 'true');
      $('#signup-vote').css('display', 'block');
    }
  }
  findUserVote();

  $scope.voteSubmit = function () {
    votedOption = $('.poll-option:checked').val();
    $http({
      method: 'POST',
      url: '/polldetails',
      data: pollid
    }).then(function (response) {

      for (i = 0; i < response.data.pollOptions.length; i++) {
        if (response.data.pollOptions[i].pollOpt === votedOption) {
          info = {
            'pollId': id,
            'pollOpt': votedOption
          }
          $http({
            method: 'POST',
            url: '/polldetailsVote',
            data: info
          }).then(function (res) {

            for (i = 0; i < res.data.pollOptions.length; i++) {
              if (res.data.pollOptions[i].pollOpt === votedOption) {
                countInc = res.data.pollOptions[i].count;
                index = i;
                break;
              }
            }

            $http({
              method: 'POST',
              url: '/userVoted',
              data: userVoteInfo
            }).then(function (resp) {
              findUserVote();
            });

            $('.poll-option:checked').attr('checked', false);
            myChart.data.datasets[0].data[index] = countInc;
            myChart.update();
          });
        }
      }
    });
  }

});