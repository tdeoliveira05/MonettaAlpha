// This function will save a comment on a feature
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Feature = require('../models/featureModel.js')

module.exports = function (commentReq, res) {
  console.log(commentReq.body)

  var userInfoPromise = serverTools.authenticate.transformJWT(commentReq)
  var featureDocPromise = Feature.findOne({_id: commentReq.body.featureId})

  Promise.all([userInfoPromise, featureDocPromise])
  .then(([userInfo, featureDoc]) => {
    var newCommentItem = {
      timestamp: new Date(),
      text: commentReq.body.text,
      username: userInfo.username,
      fullName: userInfo.fullName
    }

    featureDoc.comments.push(newCommentItem)
    console.log('comment added: ')
    console.log(featureDoc)
    serverTools.overwrite.thisFeatureDoc(featureDoc)
    res.send({success: true, errorText: ''})
  })
  .catch((error) => {
    console.log(error)
    res.send({success: false, errorText: 'caught error'})
  })

}
