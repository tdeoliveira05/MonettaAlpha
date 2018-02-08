const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken')
const config = require('config')

//Create Schema and Model
const UserSchema = new mongoose.Schema({
  admin: {type: Boolean, default: false},
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank (userModel.js)"], match: [/\S+@\S+\.\S+/, 'is invalid (userModel.js)'], index: true},
  codeUsed: {type: String, unique: true, required: [true, "a sign up code is needed (userModel.js)"]},
  password: String,
  firstName: String,
  lastName: String,
  jobPosition: String,
  organization: String,
  referenceNotes: String,
  data: {
    schemaDataVersion: {type: Number, default: 1.0},
    appUsage: {
      totalMinutes: {type: Number, default: 0},
      totalSpeechRecognitionMinutes: {type: Number, default: 0},
      voteHistory: {type: Array, default: []},
      weeklyVotesLeft: {type: Number, default: 3}
    }
  },
  settings: {
    quickMeeting: {
      participants: {type: Array, default: [{fullName: '', email: '', guest: false}]},
      title: {type: String, default: 'Quick Meeting'},
      location: {type: String, default: 'HQ'},
      timeElapsed: {
        expectedDuration: {type: Number, default: 900000},
        formattedExpectedDuration: {type: String, default: '15 mins'}
      }
    }
  }
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'userModel[usernameExists]'});

UserSchema.methods.generateJWT = function generateJWT () {
  return jwt.sign({id: this._id, username: this.username}, config.get('Presets.secret'))
}

const User = mongoose.model('user', UserSchema);

module.exports = User;

/* this is what it currently is in the server

data: {
  appUsage: {
    voteHistory: [
      {
        featureId: String,
        featureTitle: String,
        timestamp: Date,
        userVote: Number,
        voteTimeline: Array
      }
    ]


*/
