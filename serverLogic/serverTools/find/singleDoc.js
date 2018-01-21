// This function will search for a specific document based on a matching parameter
module.exports = function (Schema, paramObjs) {
  return new Promise (function(resolve, reject) {

    Schema.findOne(paramObjs)
    .then((userDoc) => {
      userDoc ? resolve(userDoc) : reject('find.singleDoc')
    })
    .catch((error) => {
      reject('find catch block: ' + error)
    })
  })
};
