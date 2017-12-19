// This function will search for a specific document based on a matching parameter
module.exports = function (Schema, paramObjs) {
  return new Promise (function(resolve, reject) {

    var doc = Schema.findOne(paramObjs)

    if (doc) {
      resolve(doc)
    } else {
      reject("ERROR(findThis.js): No such document matched the parameter object")
    }
  })
};
