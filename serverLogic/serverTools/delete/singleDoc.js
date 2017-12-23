// This function will delete a saved meeting from the DB
const Meeting = require('../../../models/meetingModel')

module.exports = function (Schema, paramObj) {

  Schema.remove(paramObj)
  .then(() => {
    console.log('sucess deleting doc of Schema')
    resolve()
  })
  .catch((error) => {
    reject('ERROR(delete/singleDoc.js):' + error)
  })
}
