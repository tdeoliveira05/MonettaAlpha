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
<<<<<<< HEAD
  notes: {
    general: [
      {
        text: String,
        itemType: String,
        timeStamp: Number,
        formattedTimeStamp: String
      }
    ],
    action: [
      {
        text: String,
        itemType: String,
        timeStamp: Number,
        formattedTimeStamp: String
      }
    ],
    decision: [
      {
        text: String,
        itemType: String,
        timeStamp: Number,
        formattedTimeStamp: String
      }
    ],
    timeSorted: [
      {
        text: String,
        itemType: String,
        timeStamp: Number,
        formattedTimeStamp: String
      }
    ]
  },
  metaData: {
    starred: Boolean,
    category: {type: String, default: 'None'}
=======
  metaData: {
    starred: {type: Boolean, default: false},
    folder: {type: String, default: 'none'}
>>>>>>> 096c9d055c72b14d5d2edf1dbcadbc8cdb0fbce0
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
