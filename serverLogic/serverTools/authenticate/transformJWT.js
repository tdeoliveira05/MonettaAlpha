// This function will validate a passed token to authenticate the proposed user route call
const Users = require('../../../models/userModel')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (reqObj) {
  return new Promise (function(resolve, reject) {

    jwt.verify(reqObj.headers.authorization.split(' ')[1], config.get('Presets.secret'), function (error, authData) {
      if (error) {
        console.log('verify JWT ERROR - ' + error)
        reject(error)
      } else {
        console.log('return JWT user info + fullName')

        Users.findOne({_id: authData.id})
        .then((userDoc) => {
          var userInfo = {id: authData.id, username: authData.username, fullName: userDoc.firstName + ' ' + userDoc.lastName}
          resolve(userInfo)
        })
        .catch((error) => {
          reject(error)
        })
      }
    })
  })
}
