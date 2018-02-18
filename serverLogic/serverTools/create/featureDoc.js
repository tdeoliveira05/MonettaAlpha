// This function will create a new feedback document
const Feature = require('../../../models/featureModel')

module.exports = function (data, userDoc) {
  return new Promise (function(resolve, reject) {
    console.log(data)
    console.log(userDoc)
    var newFeatureDoc = new Feature({
      title: data.title,
      originalRequester: {
        fullName: userDoc.firstName + ' ' + userDoc.lastName,
        username: userDoc.username,
        originalDescription: data.description
      }
    });

    if (newFeatureDoc) {
      console.log(newFeatureDoc)
      resolve(newFeatureDoc)
    } else {
      reject('createThisFeature.js): Feature content is empty and not created')
    }
  })
};
