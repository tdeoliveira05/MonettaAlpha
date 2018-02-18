// This function will create a new feedback document
const Feedback = require('../../../models/feedbackModel.js')

module.exports = function (data, userDoc) {
  return new Promise (function(resolve, reject) {
    console.log('creating new feedback doc')

    var newFeedbackDoc = new Feedback({
      username: userDoc.username,
      fullName: userDoc.fullName,
  		feedback: {
        message: data.message,
        location: data.location
      }
    });

    if (newFeedbackDoc) {
      console.log(newFeedbackDoc)
      resolve(newFeedbackDoc)
    } else {
      reject('createThisFeedback.js): Feedback content is empty and not created')
    }
  })
};
