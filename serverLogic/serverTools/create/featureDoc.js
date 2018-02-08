// This function will create a new feedback document
const Feature = require('../../../models/featureModel')

module.exports = function (featureReq, userInfo) {
  return new Promise (function(resolve, reject) {

    var newFeatureDoc = new Feature({
      title: featureReq.body.title,
      description: featureReq.body.description
    });

    if (newFeatureDoc) {
      resolve(newFeatureDoc)
    } else {
      reject('createThisFeature.js): Feature content is empty and not created')
    }
  })
};
