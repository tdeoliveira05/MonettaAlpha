import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbUserSettings from '../../DumbComponents/Main/DumbUserSettings.js'

class SmartUserSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        title: 'Quick Meeting',
        host: {
          fullName: localStorage.fullName,
          username: localStorage.username
        },
        participants: [{
          fullName: '',
          email: '',
          guest: false
        }],
        date: new Date,
        location: 'Head Quarters',
        goals: [],
        notes: [],
        metaData: {},
        meetingStats: {
          timeElapsed: {
            actualDuration: 0,
            formattedActualDuration: '00:00',
            expectedDuration: 900000,
            formattedExpectedDuration: '15 mins'
          }
        },
        automaticEmails: false
    }

    this.changeExpectedDuration = this.changeExpectedDuration.bind(this)
    this.onChange               = this.onChange.bind(this)
    this.onCheck                = this.onCheck.bind(this)
    this.createParticipantList  = this.createParticipantList.bind(this)

  }

  changeExpectedDuration (mins) {
    var newStats = this.state.meetingStats

    newStats.timeElapsed.expectedDuration          = mins*60000
    newStats.timeElapsed.formattedExpectedDuration = mins + ' mins'

    this.setState({meetingStats: newStats})
  }

  onChange (event) {
    console.log(event.target.name + '----->' + event.target.value)
    this.setState({[event.target.name]: event.target.value})
  }

  onCheck (event, isInputChecked) {
    this.setState({automaticEmails: isInputChecked})
  }

  createParticipantList () {
    var currentParticipants = this.state.participants
    var currentHost         = this.state.host

    var participantList = [
      {
        fullName: currentHost.fullName,
        email: currentHost.username,
        guest: false
      }
    ]

    return participantList
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var participantsList = this.createParticipantList()
    //----------------------------RETURN----------------------------------------
    return(
      <DumbUserSettings
        changeExpectedDuration = {this.changeExpectedDuration}
        tempMins               = {this.state.meetingStats.timeElapsed.formattedExpectedDuration.split(' ')[0]}
        defaultTitle           = {this.state.title}
        defaultLocation        = {this.state.location}
        onChange               = {this.onChange}
        onCheck                = {this.onCheck}
        participantsList       = {participantsList}
      />
    )
  }
}

export default withRouter(SmartUserSettings)
