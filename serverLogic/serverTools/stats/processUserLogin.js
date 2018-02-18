// This function will update a user document
const User = require('../../../models/userModel.js')

module.exports = function (usernameVal) {
  return new Promise (function(resolve, reject) {
    //console.log('processing user login')

    // refresh the lastLoggedIn date upon user login
    User.update(
      {username: usernameVal},
      {
        $push: {"data.userHistory.loginHistory": new Date},
        $set: {lastLoggedIn: new Date}
      }
    )
    .then((results) => {
      //console.log('log in data updated')
      //console.log(results)
      resolve(results)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })

  })
}
