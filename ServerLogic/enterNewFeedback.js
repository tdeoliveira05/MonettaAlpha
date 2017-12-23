// This function will save a submitted feedback to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (feedbackData, res) {

  serverTools.create.feedbackDoc(feedbackData)
  .then((newDoc) => {
    return serverTools.save.thisDoc(newDoc)
  })
  .then(() => {
  	res.send(JSON.stringify('Feedback saved'))
  })
  .catch((error) => {
    console.log('[enterNewFeeback.js]' + error)
  })
}
