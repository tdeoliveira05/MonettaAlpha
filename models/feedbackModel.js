const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  username: String,
  fullName: String,
  feedback: {
    message: String,
    location: String
  },
  sentOn: {type: Date, default: new Date}
}, {timestamps: true});

const Feedback = mongoose.model('feedback', FeedbackSchema);


module.exports = Feedback;
