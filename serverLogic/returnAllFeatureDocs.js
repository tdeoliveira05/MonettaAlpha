// This function will check for the availability of the attempted code and
// if sucessful will enter a new user into the data base
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Feature = require('../models/featureModel.js')

module.exports = function () {
  return new Promise (function(resolve, reject) {

    Feature.find({}).sort('-totalVotes').lean()
    .then((featureDocArray) => {
      console.log('success retrieving feature list')

      var featureListObj = {
        approved: [],
        notApproved: [],
        finished: [],
        removed: []
      }

      featureDocArray.map((item) => {
        featureListObj[item.status].push(item)
      })
      resolve(featureListObj)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
