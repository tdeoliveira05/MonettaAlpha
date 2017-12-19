// This function will check for the availability of the attempted code and
// if sucessful will enter a new user into the data base
const requireDir = require('require-dir')
const serverTools = requireDir('./ServerTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (signupData, res) {

  serverTools.checkForThisUser(signupData)
  .then((signupData) => {
    return serverTools.validateCode(signupData)
  })
  .then((signupData) => {
    return serverTools.createThisUserDoc(signupData)
  })
  .then((newUserDoc) => {
    return serverTools.saveThis(newUserDoc)
  })
  .catch((error) => {
    console.log(error)
  })
}
