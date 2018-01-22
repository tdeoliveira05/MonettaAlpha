// This function will check for the availability of the attempted code and
// if sucessful will enter a new user into the data base
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (signupData, res) {

  serverTools.check.codeDoc(signupData)
  .then(() => {
    return serverTools.create.userDoc(signupData)
  })
  .then((newUserDoc) => {
    return serverTools.save.thisDoc(newUserDoc)
  })
  .then((newUserDoc) => {
    return serverTools.validate.codeDoc(newUserDoc)
  })
  .then((newUserDoc) => {
    return serverTools.authenticate.generateJWT(newUserDoc)
  })
  .then(({token, userDoc}) => {
    console.log('Current session user token: ' + token)
    res.status(200).send({
      token: token,
      fullName: userDoc.firstName + ' ' + userDoc.lastName,
      username: userDoc.username
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
