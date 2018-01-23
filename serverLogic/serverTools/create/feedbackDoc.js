// This function will create a new feedback document
const Feedback = require('../../../models/feedbackModel')

module.exports = function (feedbackReq) {
  return new Promise (function(resolve, reject) {

    var newFeedbackDoc = new Feedback({
      username: feedbackReq.body.userTokenObj.username,
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
