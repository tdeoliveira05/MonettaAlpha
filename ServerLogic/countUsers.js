// This function will count the number of User documents in the database
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Users = require('../models/userModel')

module.exports = function (req, res) {

  serverTools.stats.quantityOfDocs(Users)
  .then((countResult) => {
    res.send(countResult)
  })
  .catch((error) => {
    console.log('[countUsers.js]' + error)
  })
}
