// This function will search for a specific document based on a matching parameter
// THIS NEEDS TO BE MODULAR AT SOME POINT....
const Meeting = require('../../../models/meetingModel.js')

module.exports = function (hostUsernameObj, filterAndSortObj) {
  return new Promise (function(resolve, reject) {
    console.log('hostUsernameObj: ')
    console.log(hostUsernameObj)


    var sortObj = filterAndSortObj.sortObj
    var filterObj = filterAndSortObj.filterObj

    // This mongo query initializes a 'cursor', which can be iterated through to find documents pertaining to the original properties below
    var totalDocs = Meeting.find(hostUsernameObj)


    if (sortObj) {
      console.log('Sorting object found - ')
      console.log(sortObj)
      var fieldVal = sortObj.type
      var orderVal = sortObj.order

      // build a sort value to put into the the sort function
      if (orderVal === 'asc') {
        var sortVal = fieldVal
      } else if (orderVal === 'desc') {
        var sortVal = '-' + fieldVal
      }

      totalDocs = totalDocs.sort(sortVal)
    }

    if (filterObj) {
      console.log('Filtering object found - ')
      console.log(filterObj)
      var filterDateObj         = filterObj.date
      var filterParticipantsObj = filterObj.participants
      var filterLocationObj     = filterObj.location
      var filterTitleObj        = filterObj.title

      if (filterLocationObj) {
        console.log('filterLocationObj engaged')
        totalDocs = totalDocs.where('location').equals(filterLocationObj.equals)
      }

      if (filterTitleObj) {
        console.log('filterTitleObj engaged')
        totalDocs = totalDocs.where('title').equals(filterTitleObj.equals)
      }

      if (filterParticipantsObj) {
        // not sure if this works
        console.log('filterParticipantsObj engaged')
        totalDocs = totalDocs.and({participants: {$elemMatch: {fullName: filterParticipantsObj.equals}}})
      }

      if (filterDateObj) {
        console.log('filterDateObj engaged')
        if (filterDateObj.greaterThan) {
          totalDocs = totalDocs.where('date').gt(filterDateObj.greaterThan)
        }

        if (filterDateObj.lessThan) {
          var lessThanVal = filterDateObj.lessThan
          totalDocs = totalDocs.where('date').lt(filterDateObj.greaterThan)
        }
      }
    }

    if (totalDocs) {
      console.log(totalDocs)
      resolve(totalDocs)
    } else {
      reject('Error(findAndSort.multipleMeetingDocs.js): totalDocs is undefined')
    }


  })
};

/*

filterAndSortObj = {
  sortObj: {
    type: 'title' || 'location' || 'date',  ROOT FIELD VALUE
    order: 'asc' || 'desc'
  },
  filterObj: {
    date: {greaterThan: NUMBER, lessThan: NUMBER},
    participants: {equals: name},
    location: {equals: name},
  }
}

*/
