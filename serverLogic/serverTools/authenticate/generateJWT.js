// This function will validate a passed token to authenticate the proposed user route call

module.exports = function (userDoc) {
  return new Promise (function(resolve, reject) {
    var token = userDoc.generateJWT()
    token ? resolve({token, userDoc}) : reject('ERROR (authenticate.generateJWT.js) No token returned')
  })
}
