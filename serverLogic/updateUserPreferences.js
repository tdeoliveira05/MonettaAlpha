// This function will update the user's document depending on certain parameters
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')

module.exports = async function (data, userDoc) {
  return new Promise (async function (resolve, reject) {

    var newUserPreferences = data

    User.update({_id: userDoc._id},
      {
        $set: {userPreferences: newUserPreferences}
      }
    )
    .then((results) => {
      console.log('success')
      resolve({success: true, errorText: ''})
    })
    .catch((error) => {
      reject({success: false, errorText: error})
    })

  })
}
