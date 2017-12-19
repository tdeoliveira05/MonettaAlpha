// This function will search for a specific document based on a matching parameter
const Code = require('../../models/codes')

module.exports = function (newUserDoc) {
  return new Promise (function(resolve, reject) {

    Code.updateOne({code: newUserDoc.codeUsed}, {used: true}, function (err, raw) {
      if (err) return handleError(err);
      // console.log('(updateCodeDoc.js) Code.updateOne({...}) returned the following raw response: ', raw)
    })

    Code.findOne({code: newUserDoc.codeUsed})
    .then((codeDoc) => {
      if (codeDoc.used) resolve()
      reject('ERROR(updateCodeDoc.js): codeDoc not properly updated')

    })
    .catch((error) => {
      reject('ERROR(updateCodeDoc.js): ' + error)
    })


  })
};
