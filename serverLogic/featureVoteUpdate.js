// This function will update the feature document's total votes and the user document's vote history
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories
const User = require('../models/userModel.js')
const Feature = require('../models/featureModel.js')

module.exports = function (voteReq, res) {

  serverTools.authenticate.transformJWT(voteReq, res)
  .then((userInfo) => {
    // retrieve the user document in this promise
    var userDocPromise = serverTools.find.singleDoc(User, {_id: userInfo.id})

    // retrieve the feature document in this promise
    var featureDocPromise = userDocPromise.then((userDocVal) => {
      return serverTools.find.singleDoc(Feature, {_id: voteReq.body.featureId})
    })

    //WAIT FOR userDocPromise and featureDocPromise to finish, and then do stuff with both their results
    return Promise.all([userDocPromise, featureDocPromise])
    .then(([userDocVal, featureDocVal]) => {

      return docObj = {userDoc: userDocVal, featureDoc: featureDocVal}

    })

  })
  .then((docObj) => {

    var userDoc = docObj.userDoc
    var featureDoc = docObj.featureDoc
    var voteHistory = userDoc.data.appUsage.voteHistory

    // find out if the document already has a vote and the user is changing their vote,
    // using a copy variable lets you mutate the original document value right away
    var votedOn = false
    userDoc.data.appUsage.voteHistory.map((voteItem, index) => {
      if (voteReq.body.featureId === voteItem.featureId) {
        console.log('user has voted in the past for: ' + featureDoc.title)
        // if no timeline is detected, initialize it
        if (!voteItem.voteTimeline) voteItem.voteTimeline = []
        // they have already voted before, on this same feature
        // check if the voteItem.userVote is different than the requested vote

        if (voteItem.userVote === voteReq.body.userVote ) {
          // if it is the same vote then take back their vote because they are likely wanting to use the vote elsewhere

          //update the total votes before anything else
          featureDoc.totalVotes -= voteReq.body.userVote
          voteItem.voteTimeline.push({outdatedVoteValue: voteItem.userVote, originalTimestamp: voteItem.timestamp})
          voteItem.userVote = 0

          //add a vote to their limit since they are taking it back
          userDoc.data.appUsage.weeklyVotesLeft += 1



        } else if (voteItem.userVote !== voteReq.body.userVote) {
          // update the featureDocument's total votes
          // if the user is going from neutral (0 || undefined) to a vote (+1 || -1) only change totalVotes by 1
          if (voteItem.userVote === 0 || voteItem.userVote === undefined) {
            featureDoc.totalVotes += voteReq.body.userVote
            //takeaway a vote from their limit since they are going from neutral score of 0 to a voting score of (+1 || -1)
            userDoc.data.appUsage.weeklyVotesLeft -= 1

          } else {
            //otherwise the user is going from a current vote (+1 || -1) to a new vote (-1 || +1) therefore change by 2
            featureDoc.totalVotes += 2*(voteReq.body.userVote)
            //dont do anything to their vote limit since their votes left does not change when they are switching from + to - or viceversa
          }
          // if they are changing their vote, simply switch the userVote prop on voteHistory


          // change the old vote value to the new and request vote value and update the history
          voteItem.voteTimeline.push({outdatedVoteValue: voteItem.userVote, originalTimestamp: voteItem.timestamp})
          voteItem.userVote = voteReq.body.userVote
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
        featureId: voteReq.body.featureId,
        featureTitle: featureDoc.title,
        timestamp: new Date,
        userVote: voteReq.body.userVote
      }

      // push a new vote item into the userDoc
      userDoc.data.appUsage.voteHistory.push(targetVoteItem)
      userDoc.data.appUsage.weeklyVotesLeft -= 1

      // finally update the featureDocument's total votes
      featureDoc.totalVotes += voteReq.body.userVote
    }


    serverTools.overwrite.thisFeatureDoc(featureDoc)
    serverTools.overwrite.thisUserDoc(userDoc)

    res.send({success: true, errorText: ''})

  })
  .catch((error) => {
    console.log(error)
  })

}
