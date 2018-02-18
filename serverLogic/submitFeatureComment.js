// This function will save a comment on a feature
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Feature = require('../models/featureModel.js')

module.exports = function (data, userDoc) {
  return new Promise (async function (resolve, reject) {

    Feature.findOne({_id: data.featureId})
    .then((featureDoc) => {
      var newCommentItem = {
        timestamp: new Date(),
        text: data.text,
        username: userDoc.username,
        fullName: userDoc.fullName
      }
      featureDoc.comments.push(newCommentItem)
      return serverTools.overwrite.thisFeatureDoc(featureDoc)
    })
    .then((successObj) => {
      resolve(successObj)
    })
    .catch((error) => {
      reject({success: false, errorText: error})
    })

  })
}
