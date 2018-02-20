// This function will check for the availability of the attempted code and
// if sucessful will enter a new user into the data base
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')
const Code = require('../models/codeModel.js')

module.exports = function (signupData, res) {
  console.log('REGISTERING AN ADMIN USER WITH FOLLOWING INFO------- ')
  console.log('username: ' + signupData.body.username)

  User.find({admin: true})
  .then((adminDocArray) => {
    // Append the number of admin
    console.log(adminDocArray.length)
    var newAdminCount = adminDocArray.length + 1

    console.log('Updated number of admins: ' + newAdminCount)
    signupData.body.codeUsed += newAdminCount // this means the codeUsed will be noted as 'ADMIN_${newAdminCount + 1}' since the secret was removed from it after prompting admin creation

    var newCodeDoc = new Code ({
      code: signupData.body.codeUsed,
      used: true
    })

    console.log(newCodeDoc)
    return serverTools.save.thisDoc(newCodeDoc)
  })
  .then((newCodeDoc) => {
    return serverTools.create.userDoc(signupData, {admin: true})
  })
  .then((newUserDoc) => {
    return serverTools.save.thisDoc(newUserDoc)
  })
  .then((newUserDoc) => {
    return serverTools.authenticate.generateJWT(newUserDoc)
  })
  .then(({token, userDoc}) => {
    console.log('Current session user token: ' + token)
    res.status(200).send({
      token: token,
      fullName: userDoc.firstName + ' ' + userDoc.lastName,
      username: userDoc.username,
      admin: true
    })
  })
  .catch((error) => {
    console.log('ERROR(requestSignup) :' + error)
    var errorObj = {}
    if (error.includes('noExist')) errorObj.codeError = 'This code is invalid'
    if (error.includes('alreadyUsed')) errorObj.codeError = 'This code has already been used'
    if (error.includes('ValidationError')) errorObj.usernameError = 'This username already exists'
    errorObj.errors = true
    res.send(errorObj)
  });
}
