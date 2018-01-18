/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

import DumbChooseMeeting from '../../DumbComponents/TeamMeeting/DumbChooseMeeting.js'
import SmartPrepareMeeting from './SmartTeamMeeting/SmartPrepareMeeting.js'
import SmartConductMeeting from './SmartTeamMeeting/SmartConductMeeting.js'
import SmartReviewMinutes from './SmartTeamMeeting/SmartReviewMeeting.js'


export default class SmartTeamMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingIndex: 1,
      typeList: [
        { text: 'General Note',
          type: 'general',
          activated: true,
          style: { // first value is for inactive, second is for active selection of that chip
            primaryColor: ['gray', 'white'], // color for borders and font
            secondaryColor: ['white', 'gray'] // color for chip background
          }
        },
        { text: 'Action Item',
          type: 'action',
          activated: false,
          style: { // first value is for inactive, second is for active selection of that chip
            primaryColor: ['rgb(255,172,77)', 'white'], // color for borders and font
            secondaryColor: ['white', 'rgb(255,172,77)'] // color for chip background
          }
        },
        { text: 'Team Decision',
          type: 'decision',
          activated: false,
          style: { // first value is for inactive, second is for active selection of that chip
            primaryColor: ['rgb(70,153,255)', 'white'], // color for borders and font
            secondaryColor: ['white', 'rgb(70,153,255)'] // color for chip background
          }
        }
      ],
      meetingData: {
        title: '',
        host: {
          fullName: this.props.userTokenObj.fullName,
          username: this.props.userTokenObj.username
        },
        participants: [],
        date: Date.now(),
        location: '',
        goals: [],
        notes: {
          general: [],
          action: [],
          decision: [],
          timeSorted: []
        },
        metaData: {},
        meetingStats: {
          timeElapsed: {
            actualDuration: 0,
            formattedActualDuration: '00:00',
            expectedDuration: 0,
            formattedExpectedDuration: '00 mins'
          }
        }
      },
      userData: this.props.userTokenObj
    }

    this.handleIndexChange        = this.handleIndexChange.bind(this)
    this.handleFinishedMeeting    = this.handleFinishedMeeting.bind(this)
    this.getMeetingData           = this.getMeetingData.bind(this)
    this.submitMeetingData        = this.submitMeetingData.bind(this)
  }

  getMeetingData () {
    return this.state.meetingData

  }

  submitMeetingData (meetingData) {
    this.setState(meetingData)
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
        this.handleFinishedMeeting()
        break
    }
  }

  handleFinishedMeeting () {
    console.log('Submitting: ')
    console.log(this.state.meetingData)

    axios.post('http://localhost:8080/enter/newMeeting', this.state.meetingData)
    .then((response) => {
      console.log(response)
    })
    .catch((errorText) => {
      console.log(errorText)
    })

  }

  render () {
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
            typeList                = {this.state.typeList}
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
            typeList                = {this.state.typeList}
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
this.state.meetingData.typeList
*/
