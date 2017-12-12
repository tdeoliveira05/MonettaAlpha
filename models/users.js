const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema and Model
const UserSchema = new Schema({
  username: String,
  password: String,
  groups: Array,
  promptqs: Array,
  time: Number
});

const User = mongoose.model('user', UserSchema);


module.exports = User;
