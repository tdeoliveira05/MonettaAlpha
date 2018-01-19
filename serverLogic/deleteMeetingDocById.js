// This function will delete a saved meeting from the DB
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Meeting = require('../models/meetingModel')

module.exports = function (deleteReq, res) {

  serverTools.delete.singleDoc(Meeting, {_id: deleteReq.body.targetDocumentId})
  .then(() => {
    res.status(200).send({success: true, errorText: ''})
  })
  .catch((error) => {
    console.log(error)
    res.send(error)
  })

}
