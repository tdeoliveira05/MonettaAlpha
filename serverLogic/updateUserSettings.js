// This function will update the user's document depending on certain parameters
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')

module.exports = function (data, userDoc) {
  return new Promise (function (resolve, reject) {

    serverTools.update.thisUserDocSettings({username: userDoc.username, updateParam: data.updateObj})
    .then((oldUserDoc) => {
      return serverTools.find.singleDoc(User, {username: userDoc.username})
    })
    .then((newUserDoc) => {
      var successObj = {
        success: true,
        errorText: ''
      }
      resolve(successObj)
    })
    .catch((error) => {
      console.log('updateUserSettings.js')
      var successObj = {
        success: false,
        errorText: error
      }
      reject(successObj)
    })

  })
}
