// This function will search for a specific document based on a matching parameter
module.exports = function (Schema, paramObj) {
  return new Promise (function(resolve, reject) {

    var doc = Schema.findOne(paramObj)

    if (doc) {
      resolve(doc)
    } else {
      reject("No such document matched the parameter object")
    }


  })
};
