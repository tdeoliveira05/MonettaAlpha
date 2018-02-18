// This function will update a user document
const User = require('../../../models/userModel.js')

module.exports = function (usernameObj) {
  return new Promise (function(resolve, reject) {

    User.update(
      {username: usernameObj.username},
      {
        $inc: {"data.appUsage.totalTimeInApp": +1000}
      }
    )
    .then(() => {
      resolve()
    })
    .catch((error) => {
      reject(error)
    })
    

  })
}
