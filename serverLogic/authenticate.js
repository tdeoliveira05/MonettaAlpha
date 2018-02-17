// This function will server as the authentication middleware
const requireDir  = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const cookie      = require('cookie')
const jwt         = require('jsonwebtoken')
const config      = require('config')
const User        = require('../models/userModel.js')

module.exports = function (req, res, next) {
  console.log('AUTHENTICATION ROUTE -----')

  // use npm package npm so process server-side cookies from the req.headers into a js object
  var cookies = cookie.parse(req.headers.cookie)
  console.log(cookies)

  // store the token value of the access_token value ('bearer ...')
  var token = cookies.access_token.split(' ')[1]

  if (!cookies.access_token) {
    res.send({success: false, errorText: 'No access token sent'})
    res.set('Connection', 'close')
  }

  jwt.verify(token, config.get('Presets.secret'), function processAuthData(error, authData) {
    // if any error present, throw the connection back to client with an unsuccessful object
    if (error) res.send({success: false, errorText: error})
    if (authData === undefined) res.send({success: false, errorText: 'No user found'})

    // find the user document associated with the authentication data
    User.findOne({_id: authData.id})
    .then((userDoc) => {
      // if no userDoc was found, throw error
      if (!userDoc) res.send({success: false, errorText: 'Failed to find user document'})

      // User was found, process their login
      serverTools.stats.processUserLogin(userDoc.username).catch((error) => console.log(error))

      // prepare successObj
      var successObj = {
        success: true,
        fullName: userDoc.firstName + ' ' + userDoc.lastName,
        username: userDoc.username,
        admin: false
      }

      // add admin flag is user is an administrator
      if (userDoc.admin) successObj.admin = true

      res.send(successObj)
    })
    .catch((error) => console.log(error))
    console.log('------------------------')
  })
}
