// This function will update a user document
const User = require('../../../models/userModel.js')

module.exports = function (meetingDoc) {
  return new Promise (function(resolve, reject) {
    console.log('processing Meeting doc for statistics')

    if (meetingDoc.meetingType === 'normal') {
      //update stats of a regular meeting
      console.log('normal meeting')
      User.update(
        {username: meetingDoc.host.username},
        {
          $inc: {
            "data.appUsage.totalMeetingsHeld": +1,
            "data.appUsage.timeInMeetingsHeld": +meetingDoc.meetingStats.timeElapsed.actualDuration
          }
        }
      )
      .then((results) => {
        console.log('normal recorded')
        console.log(results)
        resolve(results)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })


    } else {
      console.log('custom meeting')
      console.log(meetingDoc.meetingStats.timeElapsed.actualDuration)
      console.log(meetingDoc)
      // update stats of a custom meeting
      User.update(
        {username: meetingDoc.host.username},
        {
          $inc: {
            "data.appUsage.totalCustomMeetingsHeld": +1,
            "data.appUsage.timeInCustomMeetingsHeld": +meetingDoc.meetingStats.timeElapsed.actualDuration
          }
        }
      )
      .then((results) => {
        console.log('custom recorded')
        console.log(results)
        resolve(results)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })

    }


    // Update host data
    // --> total meetings Held
    // --> total minutes in meetings held

    //Increment each participant's total meetings participated in
  })
}
