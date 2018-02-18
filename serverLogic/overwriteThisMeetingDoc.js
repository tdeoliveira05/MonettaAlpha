// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Meeting = require('../models/meetingModel')

module.exports = function (data) {
  return new Promise (async function (resolve, reject) {
    var successObj = await serverTools.overwrite.thisMeetingDoc(data.targetDocument)

    if (successObj.success) {
      resolve(successObj)
    } else {
      reject(successObj)
    }
  })
}
