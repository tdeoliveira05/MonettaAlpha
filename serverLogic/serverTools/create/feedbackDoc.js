// This function will create a new feedback document
const Feedback = require('../../../models/feedbackModel')

module.exports = function (feedbackReq, userInfo) {
  return new Promise (function(resolve, reject) {

    var newFeedbackDoc = new Feedback({
      username: userInfo.username,
  		creationDate: new Date,
  		feedback: {
        message: feedbackReq.body.feedback.message,
        location: feedbackReq.body.feedback.location
      }
    });

    if (newFeedbackDoc) {
      resolve(newFeedbackDoc)
    } else {
      reject('createThisFeedback.js): Feedback content is empty and not created')
    }
  })
};
