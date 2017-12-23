// This function will extract info from a received object to create a search
// parameter object (paramObjs) for use with 'findMultipleDocs.js' serverTools
module.exports = function (searchParam) {
  return new Promise (function(resolve, reject) {

    var paramObjs = {
      username: searchParam.body.username,
      date: {$gt: searchParam.body.minDate, $lt: searchParam.body.maxDate}
    }

    switch (searchParam.body.searchType) {
      case 'title':
        paramObjs.title = {$regex: searchParam.body.search, $options: "i"}
        resolve(paramObjs)
        break;

      case 'member':
        paramObjs.members = {$regex: searchParam.body.search, $options: "i"}
        resolve(paramObjs)
        break;

      default:
        reject('ERROR(defineSearchParamObjs.js): searchType does not exist')
    }

  })
};
