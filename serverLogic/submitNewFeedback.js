// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (feedbackReq, res) {
  console.log(feedbackReq.body)
  serverTools.authenticate.transformJWT(feedbackReq)
  .then((userInfo) => {
    return serverTools.create.feedbackDoc(feedbackReq, userInfo)
  })
  .then((newDoc) => {
    console.log('----trying to save')
    console.log(newDoc)
    return serverTools.save.thisDoc(newDoc)

  })
  .then((newDoc) => {
    console.log('----sucessfully saved feedback document')
    return serverTools.send.slackMessage({message: newDoc.feedback.message, location: newDoc.feedback.location, username: newDoc.username})
  })
  .then(() => {
  	res.send({success: true, errorText: ''})
  })
  .catch((error) => {
    console.log('[enterNewFeedback.js]' + error)
    res.send({success: false, errorText: error})
  })
}
