// This function will save a new meeting to the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (data, userDoc) {
  return new Promise (function(resolve, reject) {
    serverTools.create.featureDoc(data, userDoc)
    .then((newFeatureDoc) => {
      return serverTools.save.thisDoc(newFeatureDoc)
    })
    .then((newFeatureDoc) => {
      return serverTools.stats.processNewFeatureDoc(newFeatureDoc)
    })
    .then((returnObj) => {
      if (returnObj) resolve({success: true, errorText: ''})
      reject({success: false, errorText: 'no return object found (submitNewFeature.js)'})
    })
    .catch((error) => {
      reject({success: false, errorText: error})
    })
  })
}
