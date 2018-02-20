// This function will update a user document
const User = require('../../../models/userModel.js')
const requireDir  = require('require-dir')
const serverTools = requireDir('../../serverTools', {recurse: true}) // special node module to import entire directory and their sub directories


module.exports = function (data, userDoc) {
  return new Promise (async function(resolve, reject) {

    var endIndex = userDoc.data.userHistory.loginHistory.length - 1

    console.log(userDoc.data.userHistory.loginHistory[endIndex])

    var browserHistoryItem = {
      location: data.props.location.pathname,
      timeOfAccess: new Date
    }

    userDoc.data.userHistory.loginHistory[endIndex].browserHistory.push(browserHistoryItem)

    serverTools.overwrite.thisUserDoc(userDoc)
    .then(() => resolve())
    .catch((error) => reject('processUserURLActivity: ' + error))

  })
}
