// This function will get the settings object from a specific user account
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')



module.exports = function (userReq, res) {

  // retrieve the userInfo from the token header
  serverTools.authenticate.transformJWT(userReq)
  .then((userInfo) => {
    // find the doc
    return serverTools.find.singleDoc(User, {username: userInfo.username})
  })
  .then((userDoc) => {
    // extract settings from userDoc
    // console.log(userDoc)
    var settingsObj = userDoc.settings
    settingsObj ? res.send({success: true, errorText: '', settings: settingsObj}) : res.send({success: true, errorText: 'no settings ever set', settings: false})
  })
  .catch((error) => {
    res.send({success: false, errorText: error})
    console.log(error)
  })
}
