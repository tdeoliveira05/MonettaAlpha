// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (feedbackReq, res) {
  serverTools.authenticate.transformJWT(feedbackReq)
  .then((userInfo) => {
    return serverTools.create.feedbackDoc(feedbackReq, userInfo)
  })
  .then((newDoc) => {
    return serverTools.save.thisDoc(newDoc)
  })
  .then((newDoc) => {
    serverTools.send.slackMessage({message: newDoc.feedback.message, location: newDoc.feedback.location, username: newDoc.username}).catch((error) => console.log(error))
    return serverTools.stats.processNewFeedbackDoc(newDoc)
  })
  .then(() => {
  	res.send({success: true, errorText: ''})
  })
  .catch((error) => {
    console.log('[submitNewFeedback.js]' + error)
    res.send({success: false, errorText: error})
  })
}
