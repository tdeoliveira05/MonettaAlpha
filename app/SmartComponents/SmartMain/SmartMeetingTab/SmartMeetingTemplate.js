/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import {withRouter} from 'react-router-dom'
import Snackbar from 'material-ui/Snackbar'

import DumbTemplateView from '../../../DumbComponents/Main/MeetingTab/MeetingTemplates/DumbTemplatesView'

import LoadingIcon from '../../../assets/images/LoadingIcon.png'

class SmartUserSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userDoc: this.props.userDoc,
      automaticEmails: true,
      tempId: null,
      tempTitle: '',
      tempLocation: '',
      tempTimeElapsed: {
          expectedDuration: 0,
          formattedExpectedDuration: '0 mins'
      },
      tempParticipants: [{
        fullName: localStorage.fullName,
        email: localStorage.username,
        host: true
      }],
      activeTemplateIndex: null,
      errorText: {
        email: '',
        fullName: ''
      },
      snackbarOpen: false,
      snackbarMessage: ''
    }


    this.handleSnackbarOpen  = this.handleSnackbarOpen.bind(this)
    this.checkForErrors      = this.checkForErrors.bind(this)
    this.onDeleteTemplate    = this.onDeleteTemplate.bind(this)
    this.onParticipantChange = this.onParticipantChange.bind(this)
    this.onSaveTemplate      = this.onSaveTemplate.bind(this)
    this.onDeleteParticipant = this.onDeleteParticipant.bind(this)
    this.onAddParticipant    = this.onAddParticipant.bind(this)
    this.onChange            = this.onChange.bind(this)
    this.changeTempTime      = this.changeTempTime.bind(this)
    this.resetErrors            = this.resetErrors.bind(this)
  }

  componentDidMount () {
    const self = this
    socket.on('response/secure/userDocument/getUserDoc', function (data) {
      console.log('componentDidMount socket')
      self.setState({
        errorText: {
          email: '',
          fullName: ''
        }
      })
      self.setState({userDoc: data})
    })
  }

  componentWillReceiveProps (nextProps) {
    //reset errors
    this.setState({
      errorText: {
        email: '',
        fullName: ''
      }
    })
    // the following logic governs the right content block, by settting the necessary information
    // into the state for later manipulation

    var templateFormat = {
      tempId: null,
      tempTitle: '',
      tempLocation: '',
      tempTimeElapsed: {
          expectedDuration: 0,
          formattedExpectedDuration: '0 mins'
      },
      tempParticipants: [{
        fullName: localStorage.fullName,
        email: localStorage.username
      }]
    }

  if (nextProps.match.params.templateId && nextProps.match.params.templateId !== 'create') {
    // if the nextProps templateId is a real id, then the user is trying to view/edit a template
    var templateList = this.state.userDoc.userPreferences.customTemplates
    templateList.map((templateItem, templateIndex) => {
      //find the user's template id
      if (templateItem.templateId === nextProps.match.params.templateId) {
        // push host in as the first participant
        templateFormat.tempId = templateItem.templateId
        templateFormat.tempTitle = templateItem.title
        templateFormat.tempLocation = templateItem.location
        templateFormat.tempTimeElapsed = templateItem.timeElapsed
        templateItem.participants.map((item) => templateFormat.tempParticipants.push(item))

        // pass on the active index to highlight with CSS styling
        templateFormat.activeTemplateIndex = templateIndex

        // if there was no participant, add a blank one by default
        if (templateFormat.tempParticipants.length === 1) {
          templateFormat.tempParticipants.push({
            fullName: '',
            email: '',
            guest: true
          })
        }
      }
    })
  } else if (nextProps.match.params.templateId && nextProps.match.params.templateId === 'create'){
    templateFormat.tempId = 'create'
    templateFormat.tempParticipants.push({
      fullName: '',
      email: '',
      guest: true
    })

    // erase any active template styling
    templateFormat.activeTemplateIndex = null
  }

    this.setState(templateFormat)

  }

  checkForErrors () {
      console.log('checkForErrors')

      var errorTextVal = {}
      var isThereAnError = false


      this.state.tempParticipants.map((participantItem) => {
        if (participantItem.fullName === '') {
          isThereAnError = true
          errorTextVal.fullName = 'One or more names of participants missing'
        }

        if (!participantItem.email.includes('@') || !participantItem.email.includes('.') || participantItem.email === '') {
          participantItem.email
          isThereAnError = true
          errorTextVal.email = 'One or more invalid emails'
        }

      })

      //reset all the old errors, enter the new errors into the state
      var resetTargets = []

      if (errorTextVal !== {}) {
        // run through the errorTextVal object and if it has a key
        ['title', 'fullName', 'email'].map((errorKey) => {
          if (!errorTextVal[errorKey]) {
            // if errorTextVal DOES NOT contain one of those error keys above, that means theres no error there
            // and we can reset that field by setting it to '' since its either not an error or no longer an error
            errorTextVal[errorKey] = ''
          }
        })
      }

      if (resetTargets !== []) this.resetErrors(resetTargets)

      this.setState({errorText: errorTextVal})
      return isThereAnError

  }

  resetErrors (targets) {
    var errorTextVal = this.state.errorText


    if (typeof(targets) === 'array') {
      // if targets are submitted, map through and reset the targetted properties
      targets.map((targetProperty) => {
        errorTextVal[targetProperty] = ''
      })
    } else {
      // if no targets are submitted, run through the entire errorText object and reset
      Object.keys(errorTextVal).map((errorKey) => {
        errorTextVal[errorKey] = ''
      })
    }

    this.setState({errorText: errorTextVal})
  }



  onChange (event) {
    console.log([event.target.name] + ' ------> ' + event.target.value)
    this.setState({[event.target.name]: event.target.value})
  }

  onParticipantChange (event, participantIndex, targetString) {
    var tempParticipantsVal = this.state.tempParticipants
    tempParticipantsVal[participantIndex][targetString] = event.target.value
    this.setState({tempParticipants: tempParticipantsVal})
  }

  onAddParticipant () {

    var newParticipant = {
      fullName: '',
      email: '',
      guest: true
    }

    var tempParticipantsVal = this.state.tempParticipants

    tempParticipantsVal.push(newParticipant)

    this.setState({tempParticipants: tempParticipantsVal})

  }

  onDeleteParticipant (participantIndexVal) {
    var participantList = this.state.tempParticipants
    participantList.splice(participantIndexVal, 1)
    this.setState({tempParticipants: participantList})

  }


  handleSnackbarOpen (snackbarMessageVal) {
    this.setState({snackbarOpen: !this.state.snackbarOpen, snackbarMessage: snackbarMessageVal})
  }

  onSaveTemplate () {
    // initialize variable to know if user edited or created a template item
    var method = ''

    //if there are no errors, create a fresh template item from teh temp values and push it into the participants array

    if (!this.checkForErrors()) {

      var currentUserPreferences = this.state.userDoc.userPreferences

      if (this.props.match.params.templateId === 'create') {
        // submit the new tempalte if it was created

        var newTemplateItem = {
          title: this.state.tempTitle,
          location: this.state.tempLocation,
          timeElapsed: this.state.tempTimeElapsed
        }

        // For the participants create a shallow copy (otherwise it will mutate the state directly)
        var participantsVal = this.state.tempParticipants.slice()
        participantsVal.splice(0, 1) //remove first item (which is the host)
        newTemplateItem.participants = participantsVal

        console.log('new template item')
        console.log(newTemplateItem)

        currentUserPreferences.customTemplates.push(newTemplateItem)

        method = 'created'

      } else {
        // find the targetted template if it was edited
        currentUserPreferences.customTemplates.map((templateItem) => {
          if (templateItem.templateId === this.state.tempId) {
            templateItem.title = this.state.title

            templateItem.title = this.state.tempTitle
            templateItem.location = this.state.tempLocation
            templateItem.timeElapsed = this.state.tempTimeElapsed

            // create a shallow copy (otherwise it will mutate the state)
            var participants = this.state.tempParticipants.slice()
            participants.splice(0, 1) //remove first item (which is the host)
            templateItem.participants = participants

            console.log('edited template item')
            console.log(templateItem)

            method = 'updated'
          }
        })
      }

      this.handleSnackbarOpen('Template has been successfully ' + method)

      const self = this
      socket.emit('secure/userDocument/updateUserPreferences', currentUserPreferences)

      // if a new template was created
      if (method === 'created') this.props.history.push('/meeting/templates')
    }

  }

  onDeleteTemplate () {
    console.log('Deleting template...')

    var currentUserPreferences = this.state.userDoc.userPreferences

    this.state.userDoc.userPreferences.customTemplates.map((templateItem, templateIndex) => {
      if (templateItem.templateId = this.state.tempId) {
        currentUserPreferences.customTemplates.splice(templateIndex, 1)
      }
    })

    console.log('just deleted, check shallow copy of user pref here')
    console.log(currentUserPreferences)
    this.handleSnackbarOpen('Template successfully deleted!')
    this.props.history.push('/meeting/templates')
    socket.emit('secure/userDocument/updateUserPreferences', currentUserPreferences)
  }

  changeTempTime (mins) {
    var tempTimeElapsedVal = this.state.tempTimeElapsed

    tempTimeElapsedVal.expectedDuration = mins*60000
    tempTimeElapsedVal.formattedExpectedDuration = JSON.stringify(mins + ' mins')

    this.setState({tempTimeElapsed: tempTimeElapsedVal})
  }



  render () {
    //---------------------------CONDITIONS-------------------------------------
    var templateView = (
      <div className = 'Central'>
        <h1 style = {{color: 'rgb(140,140,140)'}}> Create or choose a template to view or edit </h1>
      </div>
    )



    // if there is a temp id but its for creation, skip this if loop
    if (this.state.tempId) {
      //Reactive styling for template box heading
      var heading = 'Custom Template'
      if (this.state.tempId === 'create') heading = 'Create a New Meeting Template'

      //Reaactive styling for duration buttons
      var minuteStyle = [{},{},{},{}]
      switch (this.state.tempTimeElapsed.expectedDuration) {
        case 900000:
          // 15 mins
          minuteStyle[0] = {backgroundColor: '#6699ff', color: 'white'}
          break

        case 1800000:
          // 30 mins
          minuteStyle[1] = {backgroundColor: '#6699ff', color: 'white'}
          break

        case 3600000:
          // 60 mins
          minuteStyle[2] = {backgroundColor: '#6699ff', color: 'white'}
          break

        case 7200000:
          // 120+ mins
          minuteStyle[3] = {backgroundColor: '#6699ff', color: 'white'}
          break

      }


      templateView = (
        <div className = 'MeetingTemplatesViewBox'>
          <h1 style = {{textAlign: 'center', marginBottom: '20px', marginTop: '0px'}}> {heading} </h1>
          <div className = 'MeetingTemplatesHeaderInfo' style = {{marginBottom: '20px'}}>
            <h3 style = {{fontSize: '1.7em', fontWeight: 'bold'}}> Default title*: </h3>
            <input value = {this.state.tempTitle} name = 'tempTitle' onChange = {this.onChange} style = {{fontSize: '1.5em', fontWeight: 'bold'}}/>
          </div>
          <div className = 'MeetingTemplatesHeaderInfo'>
            <h3> Default Location: </h3>
            <input value = {this.state.tempLocation} name = 'tempLocation' onChange = {this.onChange}/>
          </div>
          <div className = 'MeetingTemplatesHeaderInfo'>
            <h3> Average duration: </h3>
            <div className = 'MeetingTemplatesHeaderButtons'>
              <button onClick = {() => this.changeTempTime(15)} style = {minuteStyle[0]}> 15 mins </button>
              <button onClick = {() => this.changeTempTime(30)} style = {minuteStyle[1]}> 30 mins </button>
              <button onClick = {() => this.changeTempTime(60)} style = {minuteStyle[2]}> 60 mins </button>
              <button onClick = {() => this.changeTempTime(120)} style = {minuteStyle[3]}> 120+ mins </button>
            </div>
          </div>

          <div className = 'MeetingTemplatesBody'>
            {this.state.tempParticipants.map((participantItem, participantIndex) => {
              // the first index is always the host so they cant edit that
              if (participantIndex === 0) {
                return (
                  <div>
                    <h3> {'Host: ' + participantItem.fullName + ' at ' + participantItem.email} </h3>
                    <br/>
                    <h3> Add default participants: </h3>
                    <div className = 'MeetingTemplatesViewParticipants'>
                      <div className = 'MeetingTemplatesParticipantsField'>
                        <h3> Full Name </h3>
                      </div>
                      <div style = {{width: '30px'}}></div>
                      <div className = 'MeetingTemplatesParticipantsField'>
                        <h3> Email Address </h3>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div className = 'MeetingTemplatesViewParticipants'>
                  <div className = 'MeetingTemplatesParticipantsField'>
                    <input
                      value = {this.state.tempParticipants[participantIndex].fullName}
                      onChange = {(event) => this.onParticipantChange(event, participantIndex, 'fullName')}
                    />
                  </div>
                  <div style = {{width: '30px'}}></div>
                  <div className = 'MeetingTemplatesParticipantsField'>
                    <input
                      value = {this.state.tempParticipants[participantIndex].email}
                      onChange = {(event) => this.onParticipantChange(event, participantIndex, 'email')}
                    />
                  </div>
                  <button onClick = {() => this.onDeleteParticipant(participantIndex)} style = {{borderRadius: '5px', marginLeft: '10px'}}> X </button>
                </div>
              )
            })}
            <button onClick = {() => this.onAddParticipant()} style = {{height: '25px'}}> Add participant + </button>
          </div>
          <p className = 'ErrorText'> {this.state.errorText.fullName} </p>
          <p className = 'ErrorText'> {this.state.errorText.email} </p>
          <p className = 'ErrorText'> {this.state.errorText.title} </p>
          <div className = 'MeetingTemplatesFooter'>
            <button style = {{color: '#6699ff'}} onClick = {() => this.onDeleteTemplate()}> Delete </button>
            <button style = {{backgroundColor: '#6699ff'}} onClick = {() => this.onSaveTemplate()}> Save </button>
          </div>
        </div>
      )
    }

    //---------------------------RETURN-----------------------------------------

    if (this.state.userDoc.userPreferences) {
      return (
        <div style = {{width: '100%', height: '100%'}}>
          <DumbTemplateView
            templateList        = {this.state.userDoc.userPreferences.customTemplates}
            history             = {this.props.history}
            templateView        = {templateView}
            activeTemplateIndex = {this.state.activeTemplateIndex}
          />
          <Snackbar
            open = {this.state.snackbarOpen}
            onRequestClose = {this.handleSnackbarOpen}
            autoHideDuration = {4000}
            message = {this.state.snackbarMessage}
            style = {{textAlign: 'center'}}
          />
        </div>
      )
    } else {
      return (
        <div className = 'Central' style = {{minHeight: 'calc(100vh - 100px)'}}>
          <img src = {LoadingIcon} />
        </div>
      )
    }



    //----------------------------RETURN----------------------------------------

  }
}

export default withRouter(SmartUserSettings)
