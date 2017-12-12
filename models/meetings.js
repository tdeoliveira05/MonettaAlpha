const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Meeting = mongoose.model('meeting', MeetingSchema);


module.exports = Meeting;
