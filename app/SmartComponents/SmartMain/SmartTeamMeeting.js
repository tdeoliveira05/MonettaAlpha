/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

import SmartChooseMeeting from './SmartTeamMeeting/SmartChooseMeeting.js'
import SmartPrepareMeeting from './SmartTeamMeeting/SmartPrepareMeeting.js'
import SmartConductMeeting from './SmartTeamMeeting/SmartConductMeeting.js'
import SmartReviewMinutes from './SmartTeamMeeting/SmartReviewMeeting.js'

const defaultSettings = require('../../clientConfig/defaults.json')
const defaultCategoryList = defaultSettings.defaultCategoryList


export default class SmartTeamMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingIndex: 1,
      categoryList: defaultCategoryList,
      meetingData: this.props.defaultMeetingData,
      userTokenObj: this.props.userTokenObj
    }

    this.handleIndexChange        = this.handleIndexChange.bind(this)
    this.handleFinishedMeeting    = this.handleFinishedMeeting.bind(this)
    this.getMeetingData           = this.getMeetingData.bind(this)
    this.submitMeetingData        = this.submitMeetingData.bind(this)
    this.resetTeamMeeting         = this.resetTeamMeeting.bind(this)
  }

  getMeetingData () {
    return this.state.meetingData

  }

  submitMeetingData (meetingDataVal) {
    this.setState({meetingData: meetingDataVal})
  }

  handleIndexChange(direction) {
    if (typeof(direction) === 'number')  this.setState({meetingIndex: direction})

    switch (direction) {
      case 'forward':
        this.setState({meetingIndex: this.state.meetingIndex + 1})
        break

      case 'backward':
        this.setState({meetingIndex: this.state.meetingIndex - 1})
        break

      case 'finished':
        this.resetTeamMeeting()
        this.handleFinishedMeeting()
        break
    }
  }

  handleFinishedMeeting () {
    console.log('Submitting: ')
    console.log(this.state.meetingData)

    axios.post('http://localhost:8080/meetingDocument/submit', this.state.meetingData)
    .then((response) => {
      console.log(response)
    })
    .catch((errorText) => {
      console.log(errorText)
    })

  }

  resetTeamMeeting () {
    var defaultMeetingData = this.props.defaultMeetingData
    this.setState({meetingData: defaultMeetingData, meetingIndex: 0})
    console.log('reset')
    console.log(this.state)
  }

  render () {
    //---------------------------VARIABLE CREATION------------------------------


    //---------------------------CONDITIONS-------------------------------------

    switch (this.state.meetingIndex) {
      case 0:
        var MeetingHeader     = ''
        var MeetingComponent  = (
          <SmartChooseMeeting
            handleIndexChange = {this.handleIndexChange}
            userTokenObj      = {this.props.userTokenObj}
            />
        )
        break

      case 1:
        var MeetingHeader     = (
          <div>
          </div>
        )
        var MeetingComponent  = (
          <SmartPrepareMeeting
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            userTokenObj            = {this.props.userTokenObj}
            />
        )
        break

      case 2:
        var MeetingHeader     = (
          <div>
            <Paper className  = 'MeetingHeader'> <h1>{this.state.meetingData.title + ' (' + this.state.meetingData.meetingStats.timeElapsed.formattedExpectedDuration + ')'}</h1> </Paper>
          </div>
        )
        var MeetingComponent  = (
          <SmartConductMeeting
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            categoryList            = {this.state.categoryList}
            userTokenObj            = {this.props.userTokenObj}
            />
        )
        break

      case 3:
        var MeetingHeader     = (
          <div>
            <Paper className  = 'MeetingHeader'> <h1>{this.state.meetingData.title}</h1> </Paper>
          </div>
        )
        var MeetingComponent  = (
          <SmartReviewMinutes
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            categoryList            = {this.state.categoryList}
            userTokenObj            = {this.props.userTokenObj}
            />
        )
        break
    }
    //----------------------------RETURN----------------------------------------
    return (
      <div>
        {MeetingHeader}
        {MeetingComponent}
      </div>
    )
  }
}
