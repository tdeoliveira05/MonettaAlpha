// This function will find, then sort/filter and return all meeting documents hosted by a user
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories



module.exports = function (userReq, res) {
  console.log('retrieving documents as per:')
  console.log(userReq.body)

  // retrieve the userInfo from the token header
  serverTools.authenticate.transformJWT(userReq)
  .then((userInfo) => {
    // find all meetings that match {host: {username: userInfo.username}}
    if (userReq.body) {
      // if paramters were submitted, filter and sort accordingly
      return serverTools.filterAndSort.multipleMeetingDocs({'host.username': userInfo.username}, userReq.body)
    } else {
      // if not, retrieve all documents
      return serverTools.find.multipleDocs({'host.username': userInfo.username})
    }
  })
  .then((docArray) => {
    console.log('returning docArray')
    res.status(200).send(docArray)
  })
  .catch((error) => {
    res.send(error)
    console.log(error)
  })
}
