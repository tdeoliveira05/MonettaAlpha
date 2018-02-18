// This function will update a meeting document
const Feature = require('../../../models/featureModel')

module.exports = function (newFeatureDoc) {
  return new Promise (function(resolve, reject) {

    Feature.replaceOne({_id: newFeatureDoc._id}, newFeatureDoc)
    .then(() => {
      resolve({success: true, errorText: ''})
    })
    .catch((error) => {
      reject({success: false, errorText: error})
    })
  })
}
