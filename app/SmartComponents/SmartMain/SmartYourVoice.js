import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes    from 'prop-types';

import DumbYourVoice from '../../DumbComponents/Main/DumbYourVoice.js';

//TESTING
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

class SmartYourVoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      featureListObj: {
        approved: [],
        notApproved: []
      },
      userFeatureVotes: []
    }

    this.getUserDoc        = this.getUserDoc.bind(this)
    this.submitVote        = this.submitVote.bind(this)
    this.createFeatureList = this.createFeatureList.bind(this)

  }

  componentDidMount () {
    var socket = this.props.socket
    const self = this
    // retrieve user votes
    this.getUserDoc()

    socket.emit('getAllFeatureDocs')
    // whenever the command is emmitted, this is updated (whenever ANY client sends the emit function)
    socket.on('receiveAllFeatureDocs', function (featureListObjVal) {
      console.log('retrieved featureListObj to store in state:')
      console.log(featureListObjVal)
      self.setState({featureListObj: featureListObjVal})
    })

  }

  getUserDoc () {
    const self = this
    axios.post('http://localhost:8080/secure/userDocument/getUserDoc')
    .then((resultsObj) => {
      if (resultsObj.data.success) {
        console.log('got userdoc vote array: ')
        var voteHistory = resultsObj.data.userDoc.data.appUsage.voteHistory
        console.log(voteHistory)
        this.setState({userFeatureVotes: voteHistory})
      } else {
        console.log('error')
        console.log(resultsObj)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  createFeatureList () {
    // will create a list with the "voted" property for the features the user has voted on
    console.log('inside createFeatureList()')
    var userFeatureVotes = this.state.userFeatureVotes
    if (userFeatureVotes.length === 0) return null// if user has no votes yet, quit this function
    var featureListObj = this.state.featureListObj
    if (!featureListObj.approved) return null

    // loop through to see which features the user has voted for
    userFeatureVotes.map((voteItem, index) => {

      featureListObj.approved.map((featureItem, index) => {
        // if a corresponding feature is found
        if (featureItem._id === voteItem.featureId) {
          console.log('user has voted for at least one feature in the list')
          featureItem.voted = voteItem.userVote
        }

      })

    })

    return featureListObj
  }

  submitVote (index, featureId, userVoteVal) {
    const self = this
    console.log('voted:')
    console.log(index)
    console.log(userVoteVal)
    // will submit a vote to the server, updating the user document with their vote AND the feature document with its total votes

    axios.post('http://localhost:8080/secure/featureVoteUpdate', {
      featureId: featureId,
      userVote: userVoteVal
    })
    .then((resultsObj) => {

      if (resultsObj.data.success) {
        socket.emit('getAllFeatureDocs')
        this.getUserDoc()
      } else {
        console.log('error: ' + resultsObj.data.errorText)
      }
    })
    .catch((error) => {
      console.log(error)
      alert(error)
    })


  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    // get all approved features to show users
    var featureListObj = this.createFeatureList()
    var featureList = []
    var topFeatures = []
    if (featureListObj !== null) {
      this.state.featureListObj.approved.map((item, index) => {
        if (index < 3) {
          topFeatures.push(item)
        } else {
          featureList.push(item)
        }
      })
    }

    console.log('***')
    console.log(topFeatures)
    console.log(topFeatures[0])
    if (topFeatures[0]) console.log(Object.keys(topFeatures[0]))
    console.log('***')

    //---------------------------RETURN-----------------------------------------
    return(
      <div>
        <DumbYourVoice
          topFeatures = {topFeatures}
          featureList = {featureList}
          submitVote = {this.submitVote}
        />
      </div>
    )
  }
}

export default withRouter(SmartYourVoice)
//-------------------------------EXPECTED PROP TYPES----------------------------
SmartYourVoice.propTypes = {
  propName: PropTypes.type,
  // Example: currentFolder: PropTypes.string.isRequired,
};
