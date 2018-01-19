// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (updateReq, res) {

  serverTools.update.thisMeetingDoc(updateReq.body.targetDocument)
  .then((newMeetingDoc) => {
    console.log('sucessful update')
    res.send({success: true, errorText: ''})
  })
  .catch((error) => {
    console.log('ERROR(updateThisMeetingDoc.js)' + error)
  })
}
