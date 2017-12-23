// This function will save the received meeting document to the DB
// and return the same document for further processing

module.exports =  function (newDoc) {
  return new Promise (function(resolve, reject) {
    newDoc.save()
    .then(() => {
      if (!newDoc.isNew) resolve (newDoc)
    })
    .then(() => {
      reject('ERROR(save.thisDoc.js): Document property .isNew was true')
    })
    .catch((error) => {
      reject('ERROR(save.thisDoc.js): ' + error)

    })
  })
};
