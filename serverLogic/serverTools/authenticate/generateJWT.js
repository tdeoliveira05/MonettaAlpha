// This function will validate a passed token to authenticate the proposed user route call
const Users = require('../../../models/userModel')

module.exports = function (userDoc) {
  return new Promise (function(resolve, reject) {
    var token = userDoc.generateJWT()
    if (token) {
      resolve(token)
    } else {
      reject('ERROR(authenticate.createAndReturnJWT.js): no token ')
    }
  })
}
