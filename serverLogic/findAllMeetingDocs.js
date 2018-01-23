// This function will find and return all meeting documents hosted by a user
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Meeting = require('../models/meetingModel.js')



module.exports = function (userReq, res) {

  // retrieve the userInfo from the token header
  serverTools.authenticate.transformJWT(userReq)
  .then((userInfo) => {
    // find all meetings that match {host: {username: userInfo.username}}
    return serverTools.find.multipleDocs(Meeting, {'host.username': userInfo.username})
  })
  .then((docArray) => {
    //console.log('returning docArray')
    //console.log(docArray)
    res.status(200).send(JSON.stringify(docArray))
  })
  .catch((error) => {
    res.send(error)
    console.log(error)
  })
}
