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
      fullName: userDoc.firstName + ' ' + userDoc.lastName,
      email: userDoc.username
    })
  })
  .catch((error) => {
    if (error === 'find.singleDoc') res.send({errors: true, usernameError: 'User not found', passwordError: ''})
    if (error === 'check.thisPassword') res.send({errors: true, usernameError: '', passwordError: 'Incorrect password'})
  })
}