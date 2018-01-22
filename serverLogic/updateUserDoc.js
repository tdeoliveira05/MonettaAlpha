// This function will update the user's document depending on certain parameters
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')

module.exports = function (userUpdateReq, res) {
  var updateParamVal = userUpdateReq.body.updateObj
  var usernameVal = userUpdateReq.body.userTokenObj.username

  console.log('current variables: ')
  console.log(updateParamVal)
  console.log(usernameVal)

  serverTools.update.thisUserDoc({username: usernameVal, updateParam: updateParamVal})
  .then(() => {
    return serverTools.find.singleDoc(User, {username: usernameVal})
  })
  .then((userDoc) => {
    return serverTools.authenticate.generateJWT(userDoc)
  })
  .then(({token, userDoc}) => {
    var userTokenObjVal = {
      token: token,
      fullName: userDoc.firstName + ' ' + userDoc.lastName,
      username: userDoc.username
    }

    res.status(200).send({
      userTokenObj: userTokenObjVal,
      success: true,
      errorText: ''
    })

  })
  .catch((error) => {
    console.log(error)
    res.send({
      success: false,
      errorText: error
    })
  })

}
