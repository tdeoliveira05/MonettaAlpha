// This function will delete a saved meeting from the DB
const requireDir = require('require-dir')
const serverTools = requireDir('./ServerTools', {recurse: true}) // special node module to import entire directory and their sub directories

const Meeting = require('../models/meetings')

module.exports = function (searchParam, res) {

  serverTools.defineSearchParamObjs(searchParam)
  .then((paramObjs) => {
    return serverTools.findMultipleDocs(Meeting, paramObjs)
  }).then((docArray) => {
    res.send(JSON.stringify(docArray))
  })
  .catch((error) => {
    console.log(error)
  })
}
