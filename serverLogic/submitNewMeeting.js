// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (meetingData) {
  return new Promise (function (resolve, reject) {


    serverTools.create.meetingDoc(meetingData)
    .then((newMeetingDoc) => {
      return serverTools.save.thisDoc(newMeetingDoc)
    })
    .then((meetingDoc) => {
      console.log('INN')
      console.log(meetingDoc)
      return serverTools.stats.processNewMeetingDoc(meetingDoc)
    })
    .then(() => {
      var successObj = {
        success: true,
        errorText: ''
      }
      resolve(successObj)
    })
    .catch((error) => {
      var successObj = {
        success: false,
        errorText: error
      }
      reject(successObj)
    })


  })
}
