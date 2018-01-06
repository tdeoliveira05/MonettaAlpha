import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import SmartPrepareMeeting from './SmartTeamMeeting/SmartPrepareMeeting.js'
import DumbConductMeeting from '../dumbComponents/TeamMeeting/DumbConductMeeting.js'
import DumbReviewMinutes from '../dumbComponents/TeamMeeting/DumbReviewMinutes.js'

export default class SmartTeamMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingIndex: 0,
      meetingData: {
        title: '',
        date: '',
        members: [],
        actionItems: [],
        goals: [],
        generalNotes: []
      }
    }

    this.handleIndexChange        = this.handleIndexChange.bind(this)
    this.handleFinishedMeeting    = this.handleFinishedMeeting.bind(this)
    this.getMeetingData           = this.getMeetingData.bind(this)
    this.submitMeetingData        = this.submitMeetingData.bind(this)
  }

  getMeetingData () {
    console.log('---')
    console.log('ORIGINAL (get): ')
    console.log(this.state.meetingData)
    return this.state.meetingData
  }

  submitMeetingData (meetingData) {
    console.log('ORIGINAL (submit): ')
    console.log(this.state.meetingData)
    console.log('---')
    this.setState(meetingData)
  }

  handleIndexChange(direction) {
    switch (direction) {
      case 'forward':
        this.setState({meetingIndex: this.state.meetingIndex + 1})
        break

      case 'backward':
        this.setState({meetingIndex: this.state.meetingIndex - 1})
        break

      case 'finished':
        this.handleFinishedMeeting()
        break
    }
  }

  handleFinishedMeeting () {
    console.log('Submitting: ' + this.state.meetingData)
  }

  render () {
    //---------------------------VARIABLE CREATION------------------------------
    // consider making this its own separate smart component (notice qty of code lines)
    // also this is pretty hack...

    //---------------------------CONDITIONS-------------------------------------

    switch (this.state.meetingIndex) {
      case 0:
        var MeetingHeader     = 'Prepare the Meeting'
        var MeetingComponent  = (
          <SmartPrepareMeeting
            handleIndexChange       = {this.handleIndexChange}
            meetingTitle            = {this.state.meetingData.title}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            />
        )
        break

      case 1:
        var MeetingHeader     = 'Conduct the Meeting'
        var MeetingComponent  = (
          <DumbConductMeeting
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            handleChangeMeetingData = {this.handleChangeMeetingData}
            />
        )
        break

      case 2:
        var MeetingHeader     = 'Review the Minutes'
        var MeetingComponent  = (
          <DumbReviewMinutes
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            handleChangeMeetingData = {this.handleChangeMeetingData}
            />
        )
        break
    }
    //----------------------------RETURN----------------------------------------
    return (
      <div>
        <div>
          <Paper className='MeetingHeader'> <h1> {MeetingHeader} </h1> </Paper>
        </div>
        {MeetingComponent}
      </div>
    )
  }
}
