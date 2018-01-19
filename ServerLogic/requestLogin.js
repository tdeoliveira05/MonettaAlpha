// This function will process a login request by a user
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Users = require('../models/userModel')

module.exports = function (req, res) {

  serverTools.find.singleDoc(Users, {username: req.body.username})
  .then((userDoc) => {
    return serverTools.check.thisPassword(userDoc, req.body.password)
  })
  .then((userDoc) => {
    return serverTools.authenticate.generateJWT(userDoc)
  })
  .then(({token, userDoc}) => {
    console.log('Current session user token: ' + token)
    res.status(200).send({
      token: token,
      userDoc: userDoc
    })  
  })
  .catch((error) => {
    console.log('[requestLogin.js]' + error)
  })
}
