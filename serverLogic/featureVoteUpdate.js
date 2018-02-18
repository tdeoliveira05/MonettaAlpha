// This function will update the feature document's total votes and the user document's vote history
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')
const Feature = require('../models/featureModel.js')

module.exports = function (data, userDoc) {
  return new Promise (async function (resolve, reject) {

    serverTools.find.singleDoc(Feature, {_id: data.featureId})
    .then((featureDoc) => {


      var featureDoc = featureDoc
      var voteHistory = userDoc.data.userHistory.voteHistory

      // find out if the document already has a vote and the user is changing their vote,
      // using a copy variable lets you mutate the original document value right away
      var votedOn = false
      userDoc.data.userHistory.voteHistory.map((voteItem, index) => {
        if (data.featureId === voteItem.featureId) {
          console.log('user has voted in the past for: ' + featureDoc.title)
          // if no timeline is detected, initialize it
          if (!voteItem.voteTimeline) voteItem.voteTimeline = []
          // they have already voted before, on this same feature
          // check if the voteItem.userVote is different than the requested vote

          if (voteItem.userVote === data.userVote ) {
            // if it is the same vote then take back their vote because they are likely wanting to use the vote elsewhere

            //update the total votes before anything else
            featureDoc.totalVotes -= data.userVote
            voteItem.voteTimeline.push({outdatedVoteValue: voteItem.userVote, originalTimestamp: voteItem.timestamp})
            voteItem.userVote = 0

            //add a vote to their limit since they are taking it back
            userDoc.data.appUsage.weeklyVotesLeft += 1



          } else if (voteItem.userVote !== data.userVote) {
            // update the featureDocument's total votes
            // if the user is going from neutral (0 || undefined) to a vote (+1 || -1) only change totalVotes by 1
            if (voteItem.userVote === 0 || voteItem.userVote === undefined) {
              featureDoc.totalVotes += data.userVote
              //takeaway a vote from their limit since they are going from neutral score of 0 to a voting score of (+1 || -1)
              userDoc.data.appUsage.weeklyVotesLeft -= 1

            } else {
              //otherwise the user is going from a current vote (+1 || -1) to a new vote (-1 || +1) therefore change by 2
              featureDoc.totalVotes += 2*(data.userVote)
              //dont do anything to their vote limit since their votes left does not change when they are switching from + to - or viceversa
            }
            // if they are changing their vote, simply switch the userVote prop on voteHistory


            // change the old vote value to the new and request vote value and update the history
            voteItem.voteTimeline.push({outdatedVoteValue: voteItem.userVote, originalTimestamp: voteItem.timestamp})
            voteItem.userVote = data.userVote
            // refresh the timestamp

          }

          //refresh the voteItem's timestamp
          voteItem.timestamp = new Date

          votedOn = true


        }
      })

      // Add a blocker if the user has never voted on it before and their votes are left at 0
      // -> they cant vote for a new feature item if they dont have any votes left to give out...

      if (!votedOn) {
        console.log('user has never voted for: ' + featureDoc.title)
        // they have never voted on this feature before so create a vote item and push it into the correct
        // place in the userDoc
        // Finally, we update the featureDocument's total votes
        var targetVoteItem = {
          featureId: data.featureId,
          featureTitle: featureDoc.title,
          timestamp: new Date,
          userVote: data.userVote
        }

        // push a new vote item into the userDoc
        userDoc.data.userHistory.voteHistory.push(targetVoteItem)
        userDoc.data.appUsage.weeklyVotesLeft -= 1

        // finally update the featureDocument's total votes
        featureDoc.totalVotes += data.userVote
      }


      serverTools.overwrite.thisFeatureDoc(featureDoc)
      serverTools.overwrite.thisUserDoc(userDoc)

      resolve({success: true, errorText: ''})

    })
    .catch((error) => {
      reject({success: false, errorText: error})
    })
  })
}
