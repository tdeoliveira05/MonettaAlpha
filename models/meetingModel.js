const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  hostUsername: String,
  participantUsernames: Array,
  guestEmails: Array,
  location: String,
  date: {type: String, default: Date.now()},
  type: String,
  meetingData: {
    generalNotes: String,
    actionItems: String,
    teamDecisions: String
  }
});

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
