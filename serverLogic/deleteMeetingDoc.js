// This function will delete a saved meeting from the DB
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Meeting = require('../models/meetingModel')

module.exports = function (req, res) {

  serverTools.delete.singleDoc(Meeting, req.body)
  .then(() => {
    console.log('success deleting meeting doc matching:' + req.body)
    resolve()
  })
  .catch((error) => {
    reject('[deleteMeetingDoc.js] - ' + error)
  })

}
