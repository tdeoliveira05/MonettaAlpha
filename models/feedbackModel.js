const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  username: String,
  fullName: String,
  creationDate: Date,
  feedback: {
    message: String,
    location: String
  }
});

const Feedback = mongoose.model('feedback', FeedbackSchema);


module.exports = Feedback;
