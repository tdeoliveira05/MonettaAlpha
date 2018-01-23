// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Meeting = require('../models/meetingModel')

module.exports = function (updateReq, res) {

  // get info of whoever is trying to make the request
  serverTools.authenticate.transformJWT(updateReq)
  .then((userInfo) => {
    // make sure that the person making that request is the person that hosted that meeting
    return serverTools.find.singleDoc(Meeting, {'host.username': userInfo.username, '_id': updateReq.body.targetDocument._id})
  })
  .then((meetingDoc) => {
    // update that doc
    return serverTools.update.thisMeetingDoc(meetingDoc)
  })
  .then((newMeetingDoc) => {
    console.log('sucessful update')
    res.send({success: true, errorText: ''})
  })
  .catch((error) => {
    console.log('ERROR(updateThisMeetingDoc.js)' + error)
  })
}
