// This function will search for a specific document based on a matching parameter
module.exports = function (Schema, paramObjs) {
  return new Promise (function(resolve, reject) {
    console.log('paramObjs: ')
    console.log(paramObjs)
    console.log(typeof(paramObjs))

    var docArray = Schema.find(paramObjs)

    if (docArray) {
      resolve(docArray)
    } else {
      reject("ERROR(findThis.js): No such document matched the parameter object")
    }
  })
};
