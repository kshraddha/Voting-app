var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: String,
  email: String,
  password: String
});

// the schema is useless so far
// we need to create a model using it
var user = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = user;