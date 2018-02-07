const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  title: String,
  host: {
    fullName: String,
    username: String
  },
  participants: [
    {
    fullName: String,
    email: String,
    guest: {type: Boolean, default: true}
    }
  ],
  date: Date,
  location: String,
  goals: [
    {
      text: String,
      completed: Boolean,
      completionTimeStamp: Number,
      metaData: Object
    }
  ],
  notes: [
    {
      text: String,
      category: String,
      timeStamp: Number,
      formattedTimeStamp: String,
      metaData: Object
    }
  ],
  metaData: {
    starred: {type: Boolean, default: false},
    folder: {type: String, default: 'none'},
    trash: {type: Boolean, default: false},
    meetingType: {type: String, default: 'standard'},
    expRating: {type: Number, default: 3}
  },
  meetingStats: {
    timeElapsed: {
      actualDuration: Number,
      formattedActualDuration: String,
      expectedDuration: Number,
      formattedExpectedDuration: String
    }
  }
}, {timestamps: true})

const Meeting = mongoose.model('meeting', MeetingSchema);


module.exports = Meeting;
