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

    console.log('found feature doc: ')
    console.log(featureDoc)

    console.log('found user doc')
    console.log(userDoc)
    var voteHistory = userDoc.data.appUsage.voteHistory

    // find out if the document already has a vote and the user is changing their vote,
    // using a copy variable lets you mutate the original document value right away
    var votedOn = false
    voteHistory.map((item, index) => {
      if (voteReq.body.featureId === item.featureId) {
        console.log('user has voted in the past for: ' + featureDoc.title)
        // they have already voted before, on this same feature
        // update the userDoc field
        var targetVoteItem = userDoc.data.appUsage.voteHistory.splice(index, 1)[0]
        console.log('--')
        console.log(targetVoteItem)
        console.log('--')
        targetVoteItem.userVote = voteReq.body.userVote
        targetVoteItem.timestamp = Date.now()
        userDoc.data.appUsage.voteHistory.push(targetVoteItem)
        votedOn = true

        // finally update the featureDocument's total votes
        // the "*2" is in order to make up for them withdrwing their vote, and then voting against it
        featureDoc.totalVotes += voteReq.body.userVote*2
      }
    })

    if (!votedOn) {
      console.log('user has never voted for: ' + featureDoc.title)
      // they have never voted on this feature before so create a vote item and push it into the correct
      // place in the userDoc
      // Finally, we update the featureDocument's total votes
      var targetVoteItem = {
        featureId: voteReq.body.featureId,
        featureTitle: featureDoc.title,
        timestamp: Date.now(),
        userVote: voteReq.body.userVote
      }

      userDoc.data.appUsage.voteHistory.push(targetVoteItem)

      // finally update the featureDocument's total votes
      featureDoc.totalVotes += voteReq.body.userVote
    }


    console.log('processed feature doc: ')
    console.log(featureDoc)

    console.log('processed user doc')
    console.log(userDoc)


    serverTools.overwrite.thisFeatureDoc(featureDoc)
    serverTools.overwrite.thisUserDoc(userDoc)

    res.send({success: true, errorText: ''})

  })
  .catch((error) => {
    console.log(error)
  })

}
