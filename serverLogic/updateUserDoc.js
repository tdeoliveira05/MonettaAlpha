// This function will update the user's document depending on certain parameters
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')

module.exports = function (userUpdateReq, res) {

  serverTools.authenticate.transformJWT(userUpdateReq)
  .then((userInfo) => {
    console.log(userInfo)
    return serverTools.update.thisUserDoc({username: userInfo.username, updateParam: userUpdateReq.body.updateObj})
  })
  .then((oldUserDoc) => {
    return serverTools.find.singleDoc(User, {username: oldUserDoc.username})
  })
  .then((newUserDoc) => {
    console.log('done')
    console.log(newUserDoc)
    res.status(200).send({
      fullName: newUserDoc.firstName + ' ' + newUserDoc.lastName,
      username: newUserDoc.username,
      success: true,
      errorText: ''
    })

  })
  .catch((error) => {
    console.log(error)
    res.send({ success: false, errorText: error})
  })

}
