// This function will create a new feedback document
const Feedback = require('../../models/feedback')

module.exports = function (feedbackData) {
  return new Promise (function(resolve, reject) {

    var newFeedbackDoc = new Feedback({
      username: feedbackData.body.username,
  		date: feedbackData.body.date,
  		issue: feedbackData.body.issue,
  		suggestion: feedbackData.body.suggestion,
  		likes: feedbackData.body.likes
    });

    if (newFeedbackDoc) {
      resolve(newFeedbackDoc)
    } else {
      reject('createThisFeedback.js): Feedback content is empty and not created')
    }
  })
};
