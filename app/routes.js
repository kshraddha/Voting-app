var user = require('./models/userInfo');
var polls = require('./models/polls');
var userVote = require('./models/userVote');
module.exports = function (app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes
  app.post('/signup', function (req, res) {
    var userInfo = new user(req.body);
    userInfo.save(function (err) {
      res.send(
        (err === null) ? {
          msg: ''
        } : {
          msg: err
        }
      );
    });
  });

  app.post('/signup/validate', function (req, res) {
    user.findOne({
      $or: [
        {
          username: req.body.username
      }, {
          email: req.body.email
      }
      ]

    }, {}, function (e, docs) {
      res.json(docs);

    });
  });

  app.post('/login', function (req, res) {
    user.findOne({
      username: req.body.username
    }, {}, function (e, docs) {
      res.json(docs);

    });
  });


  app.post('/addpoll', function (req, res) {
    var pollsInfo = new polls({
      username: req.body.username,
      pollName: req.body.pollName,
      pollOptions: req.body.pollOptions
    });
    pollsInfo.save(function (err) {
      console.log('res');
      res.send(
        (err === null) ? {
          msg: ''
        } : {
          msg: err
        }
      );
    });
  });

  app.post('/polls', function (req, res) {
    polls.find({}, {
      pollName: 1,
      _id: 1
    }, function (e, docs) {
      res.json(docs);
    });
  });

  app.post('/mypolls', function (req, res) {
    polls.find({
      username: req.body.username
    }, {
      pollName: 1,
      _id: 1
    }, function (e, docs) {
      res.json(docs);
    });
  });

  app.post('/mypolls/delete/polls', function (req, res) {
    polls.remove({
      _id: req.body._id
    }, function (e, docs) {
      res.json(docs);
    });
  });

  app.post('/mypolls/delete/userVote', function (req, res) {
    userVote.remove({
      pollid: req.body._id
    }, function (e, docs) {
      res.json(docs);
    });
  });

  app.post('/polldetails', function (req, res) {
    polls.findOne({
      _id: req.body.id
    }, {
      username: 0,
      _id: 0
    }, function (e, docs) {
      res.json(docs);
    });
  });

  app.post('/polldetailsVote', function (req, res) {
    polls.findOneAndUpdate({
        _id: req.body.pollId,
        'pollOptions.pollOpt': req.body.pollOpt
      }, {
        $inc: {
          'pollOptions.$.count': 1
        }
      },
      function (e, docs) {
        res.json(docs);
      });
  });

  app.post('/userVoted', function (req, res) {
    var userVoted = new userVote({
      pollId: req.body.pollId,
      username: req.body.username
    });
    userVoted.save(function (err) {
      res.send(
        (err === null) ? {
          msg: ''
        } : {
          msg: err
        }
      );
    });
  });

  app.post('/findUserVote', function (req, res) {
    console.log(req.body);
    userVote.findOne({
      pollId: req.body.pollId,
      username: req.body.username
    }, {}, function (e, docs) {
      res.json(docs);

    });
  });


  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
  });

};