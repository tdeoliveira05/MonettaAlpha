// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./ServerTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (meetingData, response) {

  serverTools.createThisMeeting(meetingData)
  .then((newMeetingDoc) => {
    serverTools.saveThisMeeting(newMeetingDoc)
  })
  .catch((error) => {
    console.log(error)
  })
}
