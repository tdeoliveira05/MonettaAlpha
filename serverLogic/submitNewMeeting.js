// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (meetingData, res) {

  serverTools.create.meetingDoc(meetingData)
  .then((newDoc) => {
    return serverTools.save.thisDoc(newDoc)
  })
  .then((newDoc) => {
    console.log('sucessfully saved meeting document')
    console.log(newDoc)
  	res.send({sucess: true, errorText: ''})
  })
  .catch((error) => {
    console.log('reached logic function - entered .catch')
    console.log('[enterNewMeeting.js]' + error)
    res.send({sucess: false, errorText: error})
  })
}
