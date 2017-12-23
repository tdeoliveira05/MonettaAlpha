const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken')
const config = require('config')

//Create Schema and Model
const UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank (userModel.js)"], match: [/\S+@\S+\.\S+/, 'is invalid (userModel.js)'], index: true},
  codeUsed: {type: String, unique: true, required: [true, "a sign up code is needed (userModel.js)"]},
  password: String,
  firstName: String,
  lastName: String,
  organization: String,
  data: {
    schemaDataVersion: {type: Number, default: 1.0},
    totalServiceMinutes: Number
  }
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken. (userModel.js)'});

UserSchema.methods.generateJWT = function generateJWT () {
  return jwt.sign({id: this._id, username: this.username}, config.get('Presets.secret'), {expiresIn: '8h'})
}

const User = mongoose.model('user', UserSchema);

module.exports = User;

/* this is what it currently is in the server
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  codeUsed: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
*/
