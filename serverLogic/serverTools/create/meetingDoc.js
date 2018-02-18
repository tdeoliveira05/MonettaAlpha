// This function will create a new meeting document
const Meeting = require('../../../models/meetingModel')

module.exports = function (data) {
  return new Promise (function(resolve, reject) {
    var meetingTypeVal = 'normal'

    if (typeof(data.meetingType) === 'string') {
      meetingTypeVal = data.meetingType
    }

    var newMeetingDoc = new Meeting({
      title: data.title,
      meetingType: meetingTypeVal,
      host: data.host,
      participants: data.participants,
      date: data.date,
      location: data.location,
      goals: data.goals,
      notes: data.notes,
      metaData: data.metaData,
      meetingStats: data.meetingStats
    });

    if (newMeetingDoc) {
      resolve(newMeetingDoc)
    } else {
      reject('ERROR(createThisMeeting.js): Meeting content is empty and not created')
    }
  })
};
