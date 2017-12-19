// This function will create a new meeting document
const Meeting = require('../../models/meetings')

module.exports = function (meetingData) {
  return new Promise (function(resolve, reject) {

    var newMeetingDoc = new Meeting({
      title: meetingData.body.title,
      type: meetingData.body.type,
      date: meetingData.body.date,
      location:meetingData.body.location,
      groups: meetingData.body.groups,
      chair: meetingData.body.chair,
      members: meetingData.body.members,
      minutes: meetingData.body.minutes,
      actions: meetingData.body.actions,
      decisions: meetingData.body.decisions,
      username: meetingData.body.username
    });

    if (newMeetingDoc) {
      resolve(newMeetingDoc)
    } else {
      reject('ERROR(createThisMeeting.js): Meeting content is empty and not created')
    }
  })
};
