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
  .then((token) => {
    res.status(200).send(token)
    console.log('current session token: ' + token)
  })
  .catch((error) => {
    console.log(error)
  });
}
