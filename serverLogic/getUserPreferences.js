// This function will get the user preferences object from a specific user account
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')



module.exports = function (data, userDoc) {
  return new Promise (function (resolve, reject) {
    User.findOne({username: userDoc.username})
    .then((userDoc) => {
      var outputObj = {
        success: true,
        errorText: ''
      }

      if (!userDoc.settings) {
        outputObj.errorText = 'no settings ever set'
        outputObj.success = false
      } else {
        outputObj.userPreferences = userDoc.userPreferences
      }

      resolve(outputObj)
    })
    .catch((error) => {
      var successObj = {
        success: false,
        errorText: error
      }
      reject(successObj)
    })
  })

}
