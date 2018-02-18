// This function will update the user's document depending on certain parameters
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')

module.exports = async function (data, userDoc) {
  return new Promise (async function (resolve, reject) {

    serverTools.update.thisUserDocInfo({username: userDoc.username, updateParam: data.updateObj})
    .then((oldUserDoc) => {
      return serverTools.find.singleDoc(User, {username: userDoc.username})
    })
    .then((newUserDoc) => {
      console.log('document updated')
      var successObj = {
        fullName: newUserDoc.firstName + ' ' + newUserDoc.lastName,
        username: newUserDoc.username,
        success: true,
        errorText: ''
      }
      resolve(successObj)
    })
    .catch((error) => {
      console.log('updateUserDocInfo.js error')
      var successObj = {
        success: false,
        errorText: error
      }
      reject(successObj)
    })

  })
}
