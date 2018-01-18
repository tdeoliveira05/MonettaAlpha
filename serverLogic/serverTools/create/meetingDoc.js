// This function will create a new meeting document
const Meeting = require('../../../models/meetingModel')

module.exports = function (meetingDataReq) {
  return new Promise (function(resolve, reject) {

    var newMeetingDoc = new Meeting({
      title: meetingDataReq.body.title,
      host: meetingDataReq.body.host,
      participants: meetingDataReq.body.participants,
      date: meetingDataReq.body.date,
      location: meetingDataReq.body.location,
      goals: meetingDataReq.body.goals,
      notes: meetingDataReq.body.notes,
      metaData: meetingDataReq.body.metaData,
      meetingStats: meetingDataReq.body.meetingStats
    });

    if (newMeetingDoc) {
      resolve(newMeetingDoc)
    } else {
      reject('ERROR(createThisMeeting.js): Meeting content is empty and not created')
    }
  })
};
