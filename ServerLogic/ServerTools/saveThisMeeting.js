// This function will save the received meeting document to the DB
module.exports =  function (newMeetingDoc) {

  newMeetingDoc.save()
  .then(() => {
    if (newMeetingDoc.isNew === false) console.log('MeetingDoc was saved')
  })
  .catch((error) => {
    console.log(error)
  })
};
