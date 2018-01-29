/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import {withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

import SmartPrepareStandard from './SmartStandardMeeting/SmartPrepareStandard.js'
import SmartConductStandard from './SmartStandardMeeting/SmartConductStandard.js'
import SmartReviewStandard from './SmartStandardMeeting/SmartReviewStandard.js'
const defaultSettings = require('../../clientConfig/defaults.json')
const defaultCategoryList = defaultSettings.defaultCategoryList


class SmartStandardMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingIndex: 0,
      categoryList: defaultCategoryList,
      meetingData: this.props.defaultMeetingData
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
        console.log('activating sequence')
        this.resetTeamMeeting()
        this.handleFinishedMeeting()
        break
    }
  }

  handleFinishedMeeting () {
    console.log('Submitting: ')
    console.log(this.state.meetingData)

    axios.post('http://localhost:8080/secure/meetingDocument/submit', this.state.meetingData)
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
    console.log('SmartStandardMeeting state')
    console.log(this.state)


    //---------------------------CONDITIONS-------------------------------------

    switch (this.state.meetingIndex) {

      case 0:
        var MeetingComponent  = (
          <SmartPrepareStandard
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            />
        )
        break

      case 1:
        var MeetingComponent  = (
          <SmartConductStandard
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            categoryList            = {this.state.categoryList}
            />
        )
        break

      case 2:
        var MeetingComponent  = (
          <SmartReviewStandard
            handleIndexChange       = {this.handleIndexChange}
            handleChangeTabValue    = {this.props.handleChangeTabValue}
            meetingData             = {this.state.meetingData}
            getMeetingData          = {this.getMeetingData}
            submitMeetingData       = {this.submitMeetingData}
            categoryList            = {this.state.categoryList}
            />
        )
        break
    }
    //----------------------------RETURN----------------------------------------
    return (
      <div style = {{height: '100%'}}>
        {MeetingComponent}
      </div>
    )
  }
}

export default withRouter(SmartStandardMeeting)
