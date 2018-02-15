// This function will update a user document
const User = require('../../../models/userModel.js')

module.exports = function (featureDoc) {
  return new Promise (function(resolve, reject) {
    console.log('processing Feature doc for statistics')

    //Update user's feature request history
    var featureRequestHistoryItem = {
      featureId: featureDoc._id,
      title: featureDoc.title,
      description: featureDoc.description,
      requestedOn: new Date
    }

    User.update (
      {username: featureDoc.originalRequester.username},
      {
        $push: {"data.userHistory.featureRequestHistory": featureRequestHistoryItem}
      }
    )
    .then((results) => resolve(results))
    .catch((error) => reject(errors))


  })
}
