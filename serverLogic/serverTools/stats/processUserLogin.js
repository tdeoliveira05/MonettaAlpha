// This function will update a user document
const User = require('../../../models/userModel.js')

module.exports = function (usernameVal) {
  return new Promise (function(resolve, reject) {
    //console.log('processing user login')

    var loginHistoryItem = {
      loginDate: new Date,
      browserHistory: [
        {
          location: '/',
          timeOfAccess: new Date
        }
      ]
    }

    // refresh the lastLoggedIn date upon user login
    User.update(
      {username: usernameVal},
      {
        $push: {"data.userHistory.loginHistory": loginHistoryItem},
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
