// This function will process a login request by a user
const requireDir = require('require-dir')
const serverTools = requireDir('./ServerTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Users = require('../models/users')

module.exports = function (req, res) {

  serverTools.findSingleDoc(Users, {username: req.body.username})
  .then((userDoc) => {
    return serverTools.checkThisPassword(userDoc, req.body.password)
  })
  .then((userDoc) => {
    res.send(userDoc.username) // allow login by sending back validated username
  })
  .catch((error) => {
    console.log('[requestLogin.js]' + error)
  })
}
