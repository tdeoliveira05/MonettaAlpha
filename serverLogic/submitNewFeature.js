// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (featureReq, res) {
  console.log('submitting new feature')

  serverTools.authenticate.transformJWT(featureReq)
  .then((userInfo) => {
    return serverTools.create.featureDoc(featureReq, userInfo)
  })
  .then((newFeatureDoc) => {
    res.send({success: true, errorText: ''})
    return serverTools.save.thisDoc(newFeatureDoc)
  })
  .catch((error) => {
    console.log('[submitNewFeature.js]' + error)
    res.send({success: false, errorText: error})
  })
}
