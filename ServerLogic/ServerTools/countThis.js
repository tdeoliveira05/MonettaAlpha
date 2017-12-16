// This function will count the number of documents associated with a Schema in the database//
module.exports =  function (Schema) {
  return new Promise (function (resolve, reject) {

    var docs = Schema.find({})

    if (docs) {
      resolve(JSON.stringify(docs.length))
    } else {
      reject("No documents of this Schema " + JSON.stringify(Schema) + " were found in the database")
    }

  })
};
