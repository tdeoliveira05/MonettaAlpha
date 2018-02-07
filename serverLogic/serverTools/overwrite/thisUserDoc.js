// This function will update a meeting document
const User = require('../../../models/userModel')

module.exports = function (newUserDoc) {
  return new Promise (function(resolve, reject) {

    User.replaceOne({_id: newUserDoc._id}, newUserDoc)
    .then((returnObj) => {
      resolve(returnObj)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
