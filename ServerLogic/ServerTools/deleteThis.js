// This function will PERMANENTLY delete a document in the database corresponding
// to the received document's Schema and _id

module.exports = function (doc, Schema) {
  return new Promise (function(resolve, reject) {

    Schema.remove({_id: doc._id})
    .then(() => {
      console.log('sucess')
      resolve()
    })
    .catch((error) => {
      reject(error)
    })
  })
};
