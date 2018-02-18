import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes    from 'prop-types'
import date from 'date-and-time'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

import DumbYourVoice from '../../DumbComponents/Main/DumbYourVoice.js'
import ReusableDumbDialog from '../../Reusable/Dumb/ReusableDumbDialog.js'


class SmartYourVoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      featureListObj: {
        approved: [],
        notApproved: [],
        finished: [],
        removed: []
      },
      userFeatureVotes: [],
      dialogToggle: false,
      featureDialog: 'suggestion',
      featureDialogIndex: 0,
      tempComment: '',
      tempFeatureDescription: '',
      tempFeatureTitle: '',
      suggestionError: '',
      commentError: '',
      snackbarToggle: false,
      snackbarMessage: '',
      votesLeft: 'Loading...'
    }

    this.getUserDoc           = this.getUserDoc.bind(this)
    this.submitVote           = this.submitVote.bind(this)
    this.createFeatureList    = this.createFeatureList.bind(this)
    this.dialogClick          = this.dialogClick.bind(this)
    this.dialogToggleFunction = this.dialogToggleFunction.bind(this)
    this.createFeatureDialog  = this.createFeatureDialog.bind(this)
    this.handleTempChange     = this.handleTempChange.bind(this)
    this.submitComment        = this.submitComment.bind(this)
    this.submitFeature        = this.submitFeature.bind(this)
    this.popUpSnackbar        = this.popUpSnackbar.bind(this)

  }

  componentDidMount () {
    const self = this
    // retrieve user votes
    this.getUserDoc()

    socket.emit('getAllFeatureDocs')
    // whenever the command is emmitted, this is updated (whenever ANY client sends the emit function)
    socket.on('receiveAllFeatureDocs', function (featureListObjVal) {
      self.setState({featureListObj: featureListObjVal})
    })

  }

  getUserDoc () {
    console.log('getUserDocs')
    const self = this

    socket.emit('/secure/userDocument/getUserDoc')

    socket.on('response/secure/userDocument/getUserDoc', function (data) {
      console.log(data)
      if (data.userDoc) {
        var voteHistory = data.userDoc.data.userHistory.voteHistory
        var votesLeftVal = data.userDoc.data.appUsage.weeklyVotesLeft
        self.setState({userFeatureVotes: voteHistory, votesLeft: votesLeftVal})
      } else {
        console.log('error')
        console.log(resultsObj)
      }
    })
  }

  createFeatureList () {
    // will create a list with the "voted" property for the features the user has voted on
    var userFeatureVotes = this.state.userFeatureVotes
    var featureListObj = this.state.featureListObj

    if (userFeatureVotes.length === 0) return featureListObj// if user has not spent votes yet, quit this function
    if (!featureListObj.approved) return null

    // loop through to see which features the user has voted for
    userFeatureVotes.map((voteItem, index) => {

      featureListObj.approved.map((featureItem, index) => {
        // if a corresponding feature is found
        if (featureItem._id === voteItem.featureId) {
          featureItem.voted = voteItem.userVote
        }

      })

    })

    return featureListObj
  }

  submitVote (index, featureIdVal, userVoteVal) {
    const self = this
    // will submit a vote to the server, updating the user document with their vote AND the feature document with its total votes

    //Check if used has already voted for this feature, if so block him from it
    var featureList = this.createFeatureList()
    var allow = true

    // if there are no more votes left to give out
    if (this.state.votesLeft === 0) {
      // first check if they are just trying to change their vote or if they are trying to vote for an entirely new feature
      if (featureList.approved[index].voted === 0 || featureList.approved[index].voted === undefined) {
        alert('You are currently out of votes, please wait until next week to receive more votes!')
        return
      }
    }


    socket.emit('/secure/featureVoteUpdate', {
      featureId: featureIdVal,
      userVote: userVoteVal
    })

    socket.on('response/secure/featureVoteUpdate', function (data) {
      if (data.success) {
        socket.emit('getAllFeatureDocs')
        self.getUserDoc()
      } else {
        console.log('error')
        console.log(error)
      }
    })


  }

  dialogClick (targetString, index) {
    this.setState({featureDialog: targetString})
    if (index) this.setState({featureDialogIndex: index})
    this.dialogToggleFunction()
  }

  handleTempChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitComment (targetFeatureItem) {
    if (this.state.tempComment === '') {
      this.setState({commentError: 'Please fill in your comment before posting'})
      return
    }
    const self = this

    socket.emit('/secure/featureDocument/submitComment', {
      featureId: targetFeatureItem._id,
      text: self.state.tempComment
    })

    socket.on('response/secure/featureDocument/submitComment', function (data) {
      console.log(data)
      if (data.success) {
        self.setState({tempComment: ''})
        socket.emit('getAllFeatureDocs')
        self.popUpSnackbar('Thanks for submitting your comment!')
      } else {
        console.log('error')
        console.log(data.errorText)
      }
    })


  }

  submitFeature () {
    if (this.state.tempFeatureTitle === '' || this.state.tempFeatureDescription === '') {
      this.setState({suggestionError: 'Please fill in both fields'})
      return
    }
    const self = this

    socket.emit('/secure/featureDocument/submit', {
      title: this.state.tempFeatureTitle,
      description: this.state.tempFeatureDescription
    })

    socket.on('response/secure/featureDocument/submit', function (data) {
      if (data.success) {
        self.dialogToggleFunction()
        self.popUpSnackbar('Thanks for submitting a suggestion!')
      } else {
        console.log('error')
        console.log(data.errorText)
      }
    })
  }

  popUpSnackbar (message) {
    this.setState({snackbarToggle: !this.state.snackbarToggle})
    if (message) this.setState({snackbarMessage: message})
  }

  createFeatureDialog () {
    var featureDialog = (<div></div>)

      switch (this.state.featureDialog) {
        case 'suggestion':
          featureDialog = (
            <div className = 'YourVoiceSuggestionWrapper'>
              <div className = 'YourVoiceSuggestionContent'>
                <h3> Name of feature: </h3>
                <input type = 'text' name = 'tempFeatureTitle' value = {this.state.tempFeatureTitle} onChange = {this.handleTempChange}/>
                <p> give us a little bit of context: </p>
                <textarea type = 'text' name = 'tempFeatureDescription' value = {this.state.tempFeatureDescription} onChange = {this.handleTempChange} ></textarea>
                <div className = 'YourVoiceSuggestionButtons'>
                  <button onClick = {() => this.dialogToggleFunction()}> Back </button>
                  <button onClick = {() => this.submitFeature()}> Submit your feature </button>
                </div>

              </div>
              <p style = {{color: 'red', fontWeight: 'bold'}}> {this.state.suggestionError} </p>
            </div>
          )
          break

        case 'comment':
          var targetFeatureItem = this.state.featureListObj.approved[this.state.featureDialogIndex]
          featureDialog = (
            <div className = 'YourVoiceCommentWrapper'>
              <div className = 'YourVoiceCommentContent'>
                <h1> {targetFeatureItem.title} </h1>
                <p> {targetFeatureItem.description} </p>
                <div className = 'Divider' style = {{margin: '10px 0px 10px 0px'}}></div>
                {targetFeatureItem.comments.map((commentItem) => {
                  // format Date
                  var time = new Date(commentItem.timestamp)
                  var thisDate = date.format(time, 'MMM DD - hh:mm A')

                  return (
                    <div className = 'YourVoiceCommentCard'>
                      <p style = {{margin: '10px 0px 5px 0px', fontWeight: 'bold'}}> {commentItem.fullName} </p>
                      <p> {thisDate} </p>
                      <p style = {{margin: '15px 0px 5px 0px'}}> {commentItem.text} </p>
                      <div className = 'Divider'></div>
                    </div>
                  )
                })}
                <div className = 'YourVoiceCommentInput'>
                  <p> Add a comment: </p>
                  <input
                    type = 'text'
                    name = 'tempComment'
                    value = {this.state.tempComment}
                    onChange = {this.handleTempChange}
                    onKeyPress = {(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault()
                        this.submitComment(targetFeatureItem)
                      }
                    }}
                  />
                  <div className = 'YourVoiceCommentButtons'>
                    <button onClick = {() => this.dialogToggleFunction()}> Back </button>
                    <button onClick = {() => this.submitComment(targetFeatureItem)}> Post your comment </button>
                  </div>
                </div>
              </div>
              <p style = {{color: 'red', fontWeight: 'bold'}}> {this.state.commentError} </p>
            </div>
          )
          break
      }



    return featureDialog

  }



  dialogToggleFunction () {
    if (this.state.dialogToggle === true) {
      //reset temp fields
      this.setState({
        tempComment: '',
        tempFeatureTitle: '',
        tempFeatureDescription: '',
        suggestionError: '',
        commentError: ''
      })
    }
    this.setState({dialogToggle: !this.state.dialogToggle})

  }

  render () {
    //---------------------------VARIABLES-------------------------------------
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

    var featureDialog = (
      <div>
      </div>
    )

    featureDialog = this.createFeatureDialog()

    //---------------------------RETURN-----------------------------------------
    return(
      <div>
        <DumbYourVoice
          topFeatures = {topFeatures}
          featureList = {featureList}
          submitVote = {this.submitVote}
          dialogClick = {this.dialogClick}
          votesLeft = {this.state.votesLeft}
        />
        <ReusableDumbDialog
          dialogToggle = {this.state.dialogToggle}
          dialogToggleFunction = {this.dialogToggleFunction}
          dialogComponent = {featureDialog}
        />
        <Snackbar
          open = {this.state.snackbarToggle}
          message = {this.state.snackbarMessage}
          autoHideDuration = {4000}
          onRequestClose = {() => this.popUpSnackbar()}
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
