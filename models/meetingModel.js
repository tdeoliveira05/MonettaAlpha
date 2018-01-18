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
    guest: Boolean
    }
  ],
  date: {type: String, default: Date.now()},
  location: String,
  goals: [
    {
      text: String,
      completed: Boolean,
      completionTimeStamp: Number
    }
  ],
  notes: {
    general: [
      {
        text: String,
        itemType: String,
        color: String,
        timeStamp: Number,
        formattedTimeStamp: String
      }
    ],
    action: [
      {
        text: String,
        itemType: String,
        color: String,
        timeStamp: Number,
        formattedTimeStamp: String
      }
    ],
    decision: [
      {
        text: String,
        itemType: String,
        color: String,
        timeStamp: Number,
        formattedTimeStamp: String
      }
    ],
    timeSorted: [
      {
        text: String,
        itemType: String,
        color: String,
        timeStamp: Number,
        formattedTimeStamp: String
      }
    ]
  },
  metaData: {
    starred: Boolean,
    category: String
  },
  meetingStats: {
    timeElapsed: {
      actualDuration: Number,
      formattedActualDuration: String,
      expectedDuration: Number,
      formattedExpectedDuration: String
    }
  }
})

const Meeting = mongoose.model('meeting', MeetingSchema);


module.exports = Meeting;
