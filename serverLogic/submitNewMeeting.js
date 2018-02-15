// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (meetingData, res) {



  serverTools.create.meetingDoc(meetingData)
  .then((newMeetingDoc) => {
    return serverTools.save.thisDoc(newMeetingDoc)
  })
  .then((meetingDoc) => {
    console.log('successfully saved meeting document')
    console.log(meetingDoc)
    return serverTools.stats.processNewMeetingDoc(meetingDoc).catch((error) => console.log(error))
  })
  .then((results) => {
    res.send({success: true, errorText: ''})
  })
  .catch((error) => {
    console.log('reached logic function - entered .catch')
    console.log('[submitNewMeeting.js]' + error)
    res.send({success: false, errorText: error})
  })
}
