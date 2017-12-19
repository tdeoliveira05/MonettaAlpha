// This function will save a submitted feedback to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./ServerTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (feedbackData, res) {

  serverTools.createThisFeedbackDoc(feedbackData)
  .then((newDoc) => {
    return serverTools.saveThis(newDoc)
  })
  .then(() => {
  	res.send(JSON.stringify('Feedback saved'))
  })
  .catch((error) => {
    console.log('[enterNewFeeback.js]' + error)
  })
}
