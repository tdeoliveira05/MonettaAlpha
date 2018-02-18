// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (data, userDoc) {
  return new Promise (function (resolve, reject) {

    serverTools.create.feedbackDoc(data, userDoc)
    .then((newFeedbackDoc) => {
      return serverTools.save.thisDoc(newFeedbackDoc)
    })
    .then((newFeedbackDoc) => {
      serverTools.send.slackMessage({message: newFeedbackDoc.feedback.message, location: newFeedbackDoc.feedback.location, username: newFeedbackDoc.username}).catch((error) => console.log(error))
      return serverTools.stats.processNewFeedbackDoc(newFeedbackDoc)
    })
    .then(() => {
      resolve({success: true, errorText: ''})
    })
    .catch((error) => {
      reject({success: false, errorText: error})
    })
  })
}
