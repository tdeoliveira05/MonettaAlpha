// This function will search for a specific document based on a matching parameter
module.exports = function (Schema, paramObj) {
  return new Promise (function(resolve, reject) {
    console.log('paramObj: ')
    console.log(paramObj)
    console.log('sortObjs: ')
    console.log(sortObjs)

    var docArray = Schema.find(paramObj).lean()
    .then((docArray) => {
      if (docArray) {
        console.log('found:')
        console.log(docArray)
        resolve(docArray)
      } else {
        reject("ERROR(find.multipleDocs.js): No such document matched the parameter object")
      }
    })
    .catch((error) => {
      reject('ERROR(find.multipleDocs.js): catch block - ' + error)
    })
  })
};
