// This function will check if the attempted sign up code is available
const Code = require('../../../models/codeModel')

module.exports = function (dataParam) {
  return new Promise (function(resolve, reject) {

    Code.findOne({code: dataParam.body.code})
    .then((codeDoc) => {
      if (!codeDoc) reject('ERROR(check.codeDoc.js): code does not exist')
      if (codeDoc.used) reject('ERROR(check.codeDoc.js): code has already been used')
      return codeDoc
    })
    .then((codeDoc) => {
      resolve(codeDoc)
    })
    .catch((error) => {
      reject('ERROR(check.codeDoc.js): ' + error)
    })
  })
};
