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

    if (this.props.match.params.templateId && this.props.userPreferences.customTemplates.length > 0) {
        // if the URL contains an id in it to ask for a custom template, AND if the user actually HAS a custom template then let the requrest through
        // may have to put this in the update function too
        var meetingDataVal = this.state.meetingData
        var templateSubDoc = {}


        this.props.userPreferences.customTemplates.map((templateItem, templateIndex) => {
          if (templateItem._id === this.props.match.params.templateId) {
            templateSubDoc = templateId
          }
        })

        if (Object.keys(templateSubDoc).length === 0) {
          // if no template sub document was found
          console.log('Wrong template id, redirecting to dashboard...')
          this.props.history.push('/')
        }


        meetingDataVal.title                                              = templateSubDoc.title
        meetingDataVal.location                                           = templateSubDoc.location
        meetingDataVal.participants                                       = templateSubDoc.participants
        meetingDataVal.meetingStats.timeElapsed.expectedDuration          = templateSubDoc.timeElapsed.expectedDuration
        meetingDataVal.meetingStats.timeElapsed.formattedExpectedDuration = templateSubDoc.timeElapsed.formattedExpectedDuration

        this.setState({meetingData: meetingDataVal})
    } else if (!this.props.match.params.templateId) {
      // if for whatever reason someone
      this.props.history.push('/')
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
