// This function will update a user document
const User = require('../../../models/userModel.js')

module.exports = function (updateObj) {
  return new Promise (function(resolve, reject) {
    var usernameVal = updateObj.username
    var updateParam = updateObj.updateParam

    

    User.findOneAndUpdate({username: usernameVal}, {
      $set: {
              firstName: updateParam.firstName,
              lastName: updateParam.lastName,
              jobPosition: updateParam.jobPosition,
              organization: updateParam.organization
            }
      },
      {returnNewDocument: true}
    )
    .then((newUserDoc) => {
      console.log('new document updated')
      resolve(newUserDoc)
    })
    .catch((error) => {
      reject(error)
    })


  })
}
