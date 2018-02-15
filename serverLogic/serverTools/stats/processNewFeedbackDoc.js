// This function will update a user document
const User = require('../../../models/userModel.js')

module.exports = function (feedbackDoc) {
  return new Promise (function(resolve, reject) {
    console.log('processing Feedback doc for statistics')

    var feedbackHistoryItem = {
      feedbackId: feedbackDoc._id,
      sentOn: new Date,
      message: feedbackDoc.feedback.message,
      location: feedbackDoc.feedback.location
    }

    //Update a user's feedbackHistory
    User.update(
      {username: feedbackDoc.username},
      {
        $push: {"data.userHistory.feedbackHistory": feedbackHistoryItem}
      }
    )
    .then((results) => resolve(results))
    .catch((error) => reject(error))


  })
}
