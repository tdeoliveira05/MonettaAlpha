// This function will delete a saved meeting from the DB
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Meeting = require('../models/meetingModel')

module.exports = function (data) {
  return new Promise (async function (resolve, reject) {
    console.log('deleting')
    var successObj = await serverTools.delete.singleDoc(Meeting, {_id: data.targetDocumentId})
    if (successObj.success) {
      resolve(successObj)
    } else {
      reject(successObj)
    }
  })
}
