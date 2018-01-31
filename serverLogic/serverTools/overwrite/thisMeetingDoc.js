// This function will update a meeting document
const Meeting = require('../../../models/meetingModel')

module.exports = function (newMeetingDoc) {
  return new Promise (function(resolve, reject) {

    Meeting.replaceOne({_id: newMeetingDoc._id}, newMeetingDoc)
    .then((returnObj) => {
      resolve(returnObj)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
