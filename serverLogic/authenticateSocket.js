// This function will server as the authentication middleware
const requireDir  = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const cookie      = require('cookie')
const jwt         = require('jsonwebtoken')
const config      = require('config')
const User        = require('../models/userModel.js')

module.exports = function (socket) {
  return new Promise (function (resolve, reject) {
    var cookies = cookie.parse(socket.handshake.headers.cookie)
    var access_token = cookies.access_token.split(' ')[1]

    jwt.verify(access_token, config.get('Presets.secret'), async function (error, authData) {
      if (error) reject(error)

      var userDoc = await User.findOne({_id: authData.id})

      if (userDoc) {
        resolve(userDoc)
      } else {
        reject('user not found')
      }
    })
  })

}
