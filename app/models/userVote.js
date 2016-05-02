var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userVoteSchema = new Schema({
  pollId: String,
  username: String
});

// the schema is useless so far
// we need to create a model using it
var userVote1 = mongoose.model('userVote', userVoteSchema);

// make this available to our users in our Node applications
module.exports = userVote1;