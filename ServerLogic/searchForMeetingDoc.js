// This function will delete a saved meeting from the DB
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

const Meeting = require('../models/meetingModel')

module.exports = function (searchParam, res) {

  serverTools.build.searchParamObjs(searchParam)
  .then((paramObjs) => {
    return serverTools.find.multipleDocs(Meeting, paramObjs)
  }).then((docArray) => {
    res.send(JSON.stringify(docArray))
  })
  .catch((error) => {
    console.log(error)
  })
}
