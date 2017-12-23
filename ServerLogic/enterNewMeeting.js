// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (meetingData, res) {

  serverTools.create.meetingDoc(meetingData)
  .then((newDoc) => {
    return serverTools.save.thisDoc(newDoc)
  })
  .then(() => {
  	res.send(JSON.stringify('Meeting Saved'))
  })
  .catch((error) => {
    console.log('[enterNewMeeting.js]' + error)
  })
}
