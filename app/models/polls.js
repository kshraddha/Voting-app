var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var pollsSchema = new Schema({
  username: String,
  pollName: String,
  pollOptions: [{
    pollOpt: String,
    count: Number
  }]
});

// the schema is useless so far
// we need to create a model using it
var polls = mongoose.model('polls', pollsSchema);

// make this available to our users in our Node applications
module.exports = polls;