// This function will check if a username is already in use
const User = require('../../models/users')

module.exports = function (signupData) {
  return new Promise (function(resolve, reject) {

    User.findOne({username: signupData.body.username})
      .then((userDoc) =>{
        if (userDoc) reject('ERROR(checkForThisUser.js): User already exists')
      })
      .then(() => {
        resolve(signupData)
      })
      .catch((error) => {
        reject('ERROR(checkForThisUser.js): ' + error)
      })

  })
};
