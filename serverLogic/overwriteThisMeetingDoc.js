// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Meeting = require('../models/meetingModel')

module.exports = function (updateReq, res) {
  console.log('updating req:')
  console.log(updateReq.body.targetDocument)

  // get info of whoever is trying to make the request
  serverTools.authenticate.transformJWT(updateReq)
  .then(() => {
    // make sure that the person making that request is the person that hosted that meeting
    return serverTools.overwrite.thisMeetingDoc(updateReq.body.targetDocument)
  })
  .then((returnObj) => {
    console.log('sucessful update')
    console.log(returnObj)
    res.send({success: true, errorText: ''})
  })
  .catch((error) => {
    console.log('ERROR(updateThisMeetingDoc.js)' + error)
  })
}
