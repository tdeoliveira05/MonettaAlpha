// This function will find, then sort/filter and return all meeting documents hosted by a user
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Meeting = require('../models/meetingModel.js')


module.exports = function (data, userDoc) {
  return new Promise (async function (resolve, reject) {
    console.log('inside')

    if (data) {
      reject('piece of shit')
    } else if (data.sortObj || data.filterObj) {
      var docArray = await serverTools.filterAndSort.multipleMeetingDocs({'host.username': userDoc.username}, data)
      if (!docArray) reject({success: false, errorText: 'No array of documents found'})
      resolve(docArray)
    } else {
      var docArray = await serverTools.find.multipleDocs(Meeting, {'host.username': userDoc.username})
      if (!docArray) reject({success: false, errorText: 'No array of documents found'})
      resolve(docArray)
    }
  })
}
