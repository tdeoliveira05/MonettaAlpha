// This function will search for a specific document based on a matching parameter
module.exports = function (Schema, paramObjs) {
  return new Promise (function(resolve, reject) {

    Schema.findOne(paramObjs)
    .then((userDoc) => {
      userDoc ? resolve(userDoc) : reject('userDoc object is empty ')
    })
    .catch((error) => {
      reject('ERROR (find.singleDoc.js) -b: ' + error)
    })
  })
};
