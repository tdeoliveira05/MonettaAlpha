/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import {withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

import SmartConductCustom from './SmartCustomMeeting/SmartConductCustom.js'
const defaultSettings = require('../../clientConfig/defaults.json')
const defaultCategoryList = defaultSettings.defaultCategoryList


class SmartCustomMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingIndex: 0,
      categoryList: defaultCategoryList,
      meetingData: {
        title: '',
        meetingType: 'quick meeting',
        host: {
          fullName: localStorage.fullName,
          username: localStorage.username
        },
        participants: [],
        date: new Date,
        location: '',
        goals: [],
        notes: [],
        metaData: {},
        meetingStats: {
          timeElapsed: {
            actualDuration: 0,
            formattedActualDuration: '00:00',
            expectedDuration: 0,
            formattedExpectedDuration: '00 mins'
          }
        }
      }
    }

    this.handleIndexChange        = this.handleIndexChange.bind(this)
    this.handleFinishedMeeting    = this.handleFinishedMeeting.bind(this)
    this.getMeetingData           = this.getMeetingData.bind(this)
    this.submitMeetingData        = this.submitMeetingData.bind(this)
    this.resetTeamMeeting         = this.resetTeamMeeting.bind(this)
  }

  componentWillMount () {
    console.log('component currently mounting')
    var defaults = this.props.defaultMeetingData
    this.setState({meetingData: defaults})

    switch (this.props.match.params.id) {
      case 'quick':
        console.log(this.props)
        var meetingDataVal       = this.state.meetingData
        var quickMeetingSettings = this.props.userSettings.quickMeeting

        meetingDataVal.title                                              = quickMeetingSettings.title
        meetingDataVal.location                                           = quickMeetingSettings.location
        meetingDataVal.participants                                       = quickMeetingSettings.participants
        meetingDataVal.meetingStats.timeElapsed.expectedDuration          = quickMeetingSettings.timeElapsed.expectedDuration
        meetingDataVal.meetingStats.timeElapsed.formattedExpectedDuration = quickMeetingSettings.timeElapsed.formattedExpectedDuration

        this.setState({meetingData: meetingDataVal})
    }
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
        console.log('finished')
        this.resetTeamMeeting()
        this.handleFinishedMeeting()
        break
    }
  }

  handleFinishedMeeting () {
    console.log('Submitting: ')
    console.log(this.state.meetingData)
    const self = this
    var meetingData = this.state.meetingData
    meetingData.metaData.meetingType = this.props.match.params.id

    console.log('finished')
    socket.emit('/secure/meetingDocument/submit', this.state.meetingData)

    socket.on('response/secure/meetingDocument/submit', function (data) {
      if (data) {
        self.props.history.push('/storage')
      }
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
    console.log('Smart custom meeting state')
    console.log(this.state)


    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return (
      <div style = {{height: '100%'}}>
        <SmartConductCustom
          handleIndexChange       = {this.handleIndexChange}
          meetingData             = {this.state.meetingData}
          getMeetingData          = {this.getMeetingData}
          submitMeetingData       = {this.submitMeetingData}
          categoryList            = {this.state.categoryList}
          />
      </div>
    )
  }
}

export default withRouter(SmartCustomMeeting)
