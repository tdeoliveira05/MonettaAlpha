// This function will update a meeting document
const Meeting = require('../../../models/meetingModel')

module.exports = function (meetingDoc) {
  return new Promise (function(resolve, reject) {

    Meeting.findOneAndUpdate({_id: meetingDoc._id}, meetingDoc, {
      upsert: true,
      returnNewDocument: true
    })
    .then((oldMeetingDoc) => {
      resolve(oldMeetingDoc)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
