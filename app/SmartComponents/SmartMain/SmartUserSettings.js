/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbUserSettings from '../../DumbComponents/Main/DumbUserSettings.js'

class SmartUserSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userSettings: this.props.userSettings,
      automaticEmails: true,
      snackbarOpen: false,
      errorText: {}
    }

    this.changeExpectedDuration     = this.changeExpectedDuration.bind(this)
    this.createParticipantList      = this.createParticipantList.bind(this)
    this.onQuickMeetingChange       = this.onQuickMeetingChange.bind(this)
    this.onCheck                    = this.onCheck.bind(this)
    this.onSave                     = this.onSave.bind(this)
    this.onDelete                   = this.onDelete.bind(this)
    this.onSave                     = this.onSave.bind(this)
    this.onReset                    = this.onReset.bind(this)
    this.onAdd                      = this.onAdd.bind(this)
    this.onParticipantChange        = this.onParticipantChange.bind(this)
    this.handleSnackbarOpen         = this.handleSnackbarOpen.bind(this)
    this.checkForQuickMeetingErrors = this.checkForQuickMeetingErrors.bind(this)
    this.submitQuickMeetingSettings = this.submitQuickMeetingSettings.bind(this)
    this.getUserSettings            = this.getUserSettings.bind(this)
  }

  componentWillMount () {
    this.getUserSettings()
  }

  getUserSettings () {
      const self = this

      socket.emit('/secure/userDocument/getSettings')

      socket.on('response/secure/userDocument/getSettings', function (data) {
        if (data.settings) {
          console.log(data.settings)
          self.setState({userSettings: data.settings})
          self.props.passUserSettings(data.settings)
        } else {
          console.log('no user settings were found')
          self.setState({})
        }
      })
  }

  submitQuickMeetingSettings () {
    // get user settings and locally update them
    var newSettings = this.props.userSettings
    newSettings.quickMeeting = this.state.userSettings.quickMeeting

    // send updated user settings to overwrite outdated user settings in the server
    const self = this

    socket.emit('/secure/userDocument/updateSettings', {
      updateObj: {
        settings: newSettings
      }
    })

    socket.on('response/secure/userDocument/updateSettings', function (data) {
      if (data.success) {
        self.getUserSettings()
      } else {
        console.log(error)
      }
    })

  }

  checkForQuickMeetingErrors () {
      var errorTextVal = this.state.errorText
      var isThereAnError = false

      if (this.state.userSettings.quickMeeting.title === '') {
        errorTextVal.title = 'Required'
        isThereAnError =  true
      } else {
        errorTextVal.title = ''
      }

      if (this.state.userSettings.quickMeeting.location === '') {
        errorTextVal.location = 'Required'
        isThereAnError = true
      } else {
        errorTextVal.location = ''
      }

      this.state.userSettings.quickMeeting.participants.map((item) => {
        if (item.fullName === '') {
          errorTextVal.participants = 'Please fill out all participant names'
          isThereAnError = true
        } else if (item.email === '' || !item.email.includes('@') || !item.email.includes('.')) {
          errorTextVal.participants = 'Please provide valid emails for all participants'
          isThereAnError = true
        } else {
            errorTextVal.participants = ''
        }
      })

      this.setState({errorText: errorTextVal})
      if (isThereAnError) {
        return true
      } else {
        return false
      }
  }

  onSave () {
    console.log('Saving...')
    if (!this.checkForQuickMeetingErrors()) {
      this.handleSnackbarOpen()
      this.submitQuickMeetingSettings()
      console.log('user settings saved')
    }
  }

  changeExpectedDuration (mins) {
    var newState = this.state

    newState.userSettings.quickMeeting.timeElapsed.expectedDuration          = mins*60000
    newState.userSettings.quickMeeting.timeElapsed.formattedExpectedDuration = mins + ' mins'

    this.setState(newState)
  }

  onQuickMeetingChange (event) {
    var newState = this.state
    newState.userSettings.quickMeeting[event.target.name] = event.target.value
    this.setState(newState)
  }

  onCheck (event, isInputChecked) {
    this.setState({automaticEmails: isInputChecked})
  }

  createParticipantList () {
    var currentParticipants = this.state.userSettings.quickMeeting.participants
    var currentHost         = {username: localStorage.username, fullName: localStorage.fullName}

    var participantList = [
      {
        fullName: currentHost.fullName,
        email: currentHost.username,
        guest: false
      }
    ]

    currentParticipants.map((item) => participantList.push(item))

    return participantList
  }

  onReset () {
    this.getUserSettings()
  }

  onAdd () {
    var newState = this.state
    var newItem = {
      fullName: '',
      email: '',
      guest: true
    }
    newState.userSettings.quickMeeting.participants.push(newItem)

    this.setState(newState)
  }

  onDelete (index) {
    var participantIndex = index - 1 //host is index = 0 in the input map function and you cant delete the only participant left
    var newState = this.state
    newState.userSettings.quickMeeting.participants.splice(participantIndex, 1)
    this.setState(newState)

  }

  onParticipantChange(event, index, currentTarget) {
    //host is index = 0 in the input map function
    var newState = this.state
    var participantIndex = index - 1
    newState.userSettings.quickMeeting.participants[participantIndex][currentTarget] = event.target.value
    this.setState(newState)
  }

  handleSnackbarOpen () {
    this.setState({snackbarOpen: !this.state.snackbarOpen})
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var participantsList = this.createParticipantList()
    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <button style = {{width: '100%', color: 'white', backgroundColor: 'gray', height: '40px'}} onClick = {this.props.signOut}> Sign Out </button>
        <DumbUserSettings
          participantsList       = {participantsList}
          tempMins               = {this.state.userSettings.quickMeeting.timeElapsed.formattedExpectedDuration.split(' ')[0]}
          defaultTitle           = {this.state.userSettings.quickMeeting.title}
          defaultLocation        = {this.state.userSettings.quickMeeting.location}
          snackbarOpen           = {this.state.snackbarOpen}
          automaticEmails        = {this.state.automaticEmails}
          onChange               = {this.onQuickMeetingChange}
          onCheck                = {this.onCheck}
          changeExpectedDuration = {this.changeExpectedDuration}
          onSave                 = {this.onSave}
          onDelete               = {this.onDelete}
          onReset                = {this.onReset}
          onAdd                  = {this.onAdd}
          onParticipantChange    = {this.onParticipantChange}
          handleSnackbarOpen     = {this.handleSnackbarOpen}
          titleError             = {this.state.errorText.title}
          locationError          = {this.state.errorText.location}
          participantError       = {this.state.errorText.participants}
        />
      </div>
    )
  }
}

export default withRouter(SmartUserSettings)
