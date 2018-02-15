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
  lastLoggedIn: {type: Date, default: new Date},
  createdOn: {type: Date, default: new Date},
  firstName: String,
  lastName: String,
  jobPosition: String,
  organization: String,
  referenceNotes: String,
  data: {
    schemaDataVersion: {type: Number, default: 1.0},
    appUsage: {
      totalTimeInApp: {type: Number, default: 0},
      totalSpeechRecognitionTime: {type: Number, default: 0},
      timeInMeetingsHeld: {type: Number, default: 0},
      timeInCustomMeetingsHeld: {type: Number, default: 0},
      timeInMeetingsParticipatedIn: {type: Number, default: 0},
      weeklyVotesLeft: {type: Number, default: 3},
      totalMeetingsHeld: {type: Number, default: 0},
      totalCustomMeetingsHeld: {type: Number, default: 0},
      totalMeetingsParticipatedIn: {type: Number, default: 0}
    },
    userHistory: {
      voteHistory: {type: Array, default: []},
      featureRequestHistory: {type: Array, default: []},
      feedbackHistory: {type: Array, default: []},
      loginHistory: {type: Array, default: [new Date]}
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

/* hidden arrays

data: {
  userHistory: {
    voteHistory: [
      {
        featureId: String,
        featureTitle: String,
        timestamp: Date,
        userVote: Number,
        voteTimeline: Array
      }
    ],
    featureRequestHistory: [
      {
        featureId: String,
        title: String,
        description: String,
        requestedOn: Date
      }
    ],
    feedbackHistory: [
      {
        feedbackId: String,
        createdAt: Date,
        message: String,
        location: String
      }
    ]


*/
