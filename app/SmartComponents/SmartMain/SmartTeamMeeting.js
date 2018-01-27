/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

import DumbChooseMeeting from '../../DumbComponents/Main/TeamMeeting/DumbChooseMeeting.js'
import SmartPrepareMeeting from './SmartTeamMeeting/SmartPrepareMeeting.js'
import SmartConductMeeting from './SmartTeamMeeting/SmartConductMeeting.js'
import SmartReviewMinutes from './SmartTeamMeeting/SmartReviewMeeting.js'

const defaultSettings = require('../../clientConfig/defaults.json')
const defaultCategoryList = defaultSettings.defaultCategoryList


export default class SmartTeamMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingIndex: 2,
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
    console.log('team meeting state--')
    console.log(this.state)
    console.log('--------------------')
    //---------------------------VARIABLE CREATION------------------------------
    //---------------------------CONDITIONS-------------------------------------

    switch (this.state.meetingIndex) {
      case 0:
        var MeetingHeader     = ''
        var MeetingComponent  = (
          <DumbChooseMeeting
            handleIndexChange = {this.handleIndexChange}
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
            categoryList                = {this.state.categoryList}
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
            handleChangeTabValue    = {this.props.handleChangeTabValue}
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

/* default for testing

notes: {
  general: [
    {
      text: 'temporary text 1',
      type: 'general',
      color: 'gray',
      timeStamp: '270000',
      formattedTimeStamp: '4:30'
    },
    {
      text: 'temporary text 3',
      type: 'general',
      color: 'gray',
      timeStamp: '500000',
      formattedTimeStamp: '8:20'
    },
    {
      text: 'temporary text 7',
      type: 'general',
      color: 'gray',
      timeStamp: '1740000',
      formattedTimeStamp: '29:00'
    }
  ],
    action: [
    {
      text: 'temporary text 2',
      type: 'action',
      color: 'rgb(70,153,255)',
      timeStamp: '390000',
      formattedTimeStamp: '6:30'
    },
    {
      text: 'temporary text 4',
      type: 'action',
      color: 'rgb(70,153,255)',
      timeStamp: '660000',
      formattedTimeStamp: '11:00'
    },
    {
      text: 'temporary text 8',
      type: 'action',
      color: 'rgb(70,153,255)',
      timeStamp: '2100000',
      formattedTimeStamp: '35:00'
    }
  ],
    decision: [
    {
      text: 'temporary text 5',
      type: 'decision',
      color: 'rgb(70,153,255)',
      timeStamp: '1160000',
      formattedTimeStamp: '19:20'
    },
    {
      text: 'temporary text 6',
      color: 'rgb(70,153,255)',
      type: 'decision',
      timeStamp: '1620000',
      formattedTimeStamp: '27:00'
    }
  ]
},

-------------------------------------------------------------------------------
for redux include:

user token
this.state.meetingData.categoryList
*/
