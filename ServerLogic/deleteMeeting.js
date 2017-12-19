// This function will delete a saved meeting from the DB
const requireDir = require('require-dir')
const serverTools = requireDir('./ServerTools', {recurse: true}) // special node module to import entire directory and their sub directories

const Meeting = require('../models/meetings')

module.exports = function (req, res) {

  serverTools.findSingleDoc(Meeting, {_id: req.body._id})
  .then((meetingDoc) => {
    return serverTools.deleteThis(meetingDoc, Meeting)
  })
  .catch((error) => {
    console.log('[deleteThisMeeting.js]' + error)
  })

}
