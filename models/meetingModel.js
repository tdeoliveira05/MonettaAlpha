const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  title: String,
  hostUsername: String,
  participants: [
    {
      firstName: {type: String, required: [true, 'Participant data needs to include a firstName']},
      lastName: {type: String, required: [true, 'Participant data needs to include a lastName']},
      username: {type: String, required: [true, 'Participant data needs to include a username']}
    }
  ],
  guestEmails: Array,
  date: {type: String, default: Date.now()},
  location: String,
  meetingNotes: {
    generalNotes: String,
    actionItems: String,
    teamDecisions: String
  },
  metaData: {
    starred: Boolean,
    category: String
  },
  meetingStats: {
    duration: {
      actualDuration: Number,
      expectedDuration: Number,
    }
  }
})

const Meeting = mongoose.model('meeting', MeetingSchema);


module.exports = Meeting;

/* this is what it currently is in the server

const MeetingSchema = new Schema({
  username: String,
  title: String,
  type: String,
  date: Number,
  location:String,
  groups: Array,
  chair: String,
  lists: Array,
  members: Array,
  minutes: Array,
  actions: Array,
  decisions:Array
});

*/

/* this is what it should be

SUNNY USE THIS TO PLAN SmartDocumentStorage.js

const MeetingSchema = new Schema({
  title: String,
  hostUsername: String,
  participants: [

  ],
  guestEmails: Array,
  date: {type: String, default: Date.now()},
  meetingNotes: {
    generalNotes: String,
    actionItems: String,
    teamDecisions: String
  },
  metaData: {
    starred: Boolean,
    category: String
  },
  meetingStats: {
    duration: {
      actualDuration: Number,
      expectedDuration: Number,
    }
  }

});

*/
