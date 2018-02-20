// This function will create a new user document
const User = require('../../../models/userModel.js')
const bcrypt = require('bcrypt')
const config = require('config')

module.exports = function (signupData, adminBoolean) {
  return new Promise (function(resolve, reject) {

    bcrypt.hash(signupData.body.password, 10).then(function(hash) {
      const hashPass = hash
      var adminVal = false
      if (adminBoolean.admin) {
        console.log('registering admin: ' + adminBoolean.admin)
        adminVal = adminBoolean.admin
      }


      var newUserDoc = new User({
        username: signupData.body.username,
        password: hashPass,
        codeUsed: signupData.body.codeUsed,
        admin: adminVal
      });
      resolve(newUserDoc)
    })
    .catch((error) => {
      reject('ERROR(create.userDoc.js): ' + error)
    })

  })
};

// The User schema has built in validators to make sure a user document
// is created without dirty data
// This makes it so that this function doesn't have to worry about directory
// data, the schema has its own validators and can police itself
