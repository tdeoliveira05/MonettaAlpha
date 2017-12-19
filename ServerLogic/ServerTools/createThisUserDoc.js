// This function will create a new user document
const User = require('../../models/users')
const bcrypt = require('bcrypt')

module.exports = function (signupData) {
  return new Promise (function(resolve, reject) {

    bcrypt.hash(signupData.body.password, 10).then(function(hash) {
      const hashPass = hash
      var newUserDoc = new User({
        username: signupData.body.username,
        password: hashPass,
        codeUsed: signupData.body.code
      });
      resolve(newUserDoc)
    })
    .catch((error) => {
      reject('ERROR(createThisUserDoc.js): ' + error)
    })

  })
};
