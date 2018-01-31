/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar'
import { Route, withRouter} from 'react-router-dom'

//for activating mic----------------------------------
import getUserMedia from 'get-user-media-promise'
import MicrophoneStream from 'microphone-stream'
var micStream = new MicrophoneStream() // creates an instance of MicrophoneStream, this will hold the microphone input and will send to backend
var socket
var AudioContext, context, processor, input
//----------------------------------------------------

import SmartStandardMeeting from './SmartMain/SmartStandardMeeting.js'
import SmartCustomMeeting from './SmartMain/SmartCustomMeeting.js'
import SmartDocumentStorage from './SmartMain/SmartDocumentStorage.js'
import SmartProductivityData from './SmartMain/SmartProductivityData.js'
import SmartUserSettings from './SmartMain/SmartUserSettings.js'
import SmartWelcomePage from './SmartMain/SmartWelcomePage.js'
import DumbNavigationBar from '../DumbComponents/Main/DumbNavigationBar'
import SmartDashboard from './SmartMain/SmartDashboard.js'
import SmartHelp from './SmartMain/SmartHelp.js'

import ReusableSmartFeedback from '../Reusable/Smart/ReusableSmartFeedback.js'
import ReusableDumbDialog from '../Reusable/Dumb/ReusableDumbDialog.js'

class SmartMain extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      mainLocation: 'internal',
      path: 'teamMeeting',
      defaultMeetingData: {
        title: '',
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
      },
      openFeedback: false,
      snackbarOpen: false,
      userSettings: this.props.userSettings,
      quickMeeting: false,
      transcript: ''
    }

    this.updateUserDocument       = this.updateUserDocument.bind(this)
    this.updateMainLocation       = this.updateMainLocation.bind(this)
    this.openFeedbackDialog       = this.openFeedbackDialog.bind(this)
    this.feedbackSuccessFunction  = this.feedbackSuccessFunction.bind(this)
    this.openSnackbar             = this.openSnackbar.bind(this)
    this.activatePath             = this.activatePath.bind(this)
    this.passUserSettings         = this.passUserSettings.bind(this)

    this.startSpeechStream        = this.startSpeechStream.bind(this)
    this.stopSpeechStream         = this.stopSpeechStream.bind(this)


  }

  componentDidMount () {
    this.updateMainLocation()
    socket = this.props.socket
  }

  componentWillReceiveProps (nextProps) {
    // App.js needs more time to initialize user settings due to the asynchronous nature of the code
    // this line of code will ensure that once App.js re-sets its own state with the initial version of the user's settings, the
    // change will pass down through a new userSettings prop and smartMain.js will update its own state accordingly to propagate the user settings
    if (nextProps.userSettings !== this.props.userSettings) this.setState({userSettings: nextProps.userSettings})
  }

  passUserSettings (userSettingsVal) {
    this.setState({userSettings: userSettingsVal})
  }

  updateMainLocation () {
    if (localStorage.fullName.includes('undefined') || localStorage.fullName === '') {
      this.setState({mainLocation: 'welcome'})
      console.log('updateMainLocation(): mainLocation set to welcome')
    }
  }

  updateUserDocument(updateObjVal) {
    const self = this
    axios.post('http://localhost:8080/secure/userDocument/updateInfo', {
      updateObj: updateObjVal
    })
    .then((successObj) => {
      console.log(successObj)

      if (successObj.data.success) {
        localStorage.username = successObj.data.username
        localStorage.fullName = successObj.data.fullName
        this.setState({mainLocation: 'internal'})
      } else {
        console.log(successObj.data.errorText)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  openFeedbackDialog () {
    this.setState({openFeedback: !this.state.openFeedback})
  }

  feedbackSuccessFunction () {
    this.openFeedbackDialog()
    this.openSnackbar()
  }

  openSnackbar () {
    this.setState({snackbarOpen: !this.state.snackbarOpen})
  }

  activatePath (pathVal) {
    this.setState({path: pathVal})
  }

  //--------------------------------------------------------------------------//
  //---------------VOICE RECOGNITION PROTOCOLS AND FUNCTIONS------------------//

  startSpeechStream () {
    // Check this with Safari (https://www.npmjs.com/package/microphone-stream)
    // create a read stream that will read the .raw audio file being created by the audio input and send it up to the server
    console.log('Starting voice recognition...')

    //initialize speech api and broaden global scope
    this.props.socket.emit('startGoogleCloudSpeech')

    const self = this

    // code used from https://github.com/vin-ni/Google-Cloud-Speech-Node-Socket-Playground
    // AudioContext already defined, grabs the audio of the window
    AudioContext = window.AudioContext || window.webkitAudioContext

    // initiates an instance
    context = new AudioContext()

    //buffer Process
    processor = context.createScriptProcessor(2048, 1, 1)
    processor.connect(context.destination)
    context.resume()


    navigator.mediaDevices.getUserMedia({video: false, audio: true})
    .then((stream) => {
      input = context.createMediaStreamSource(stream)
      input.connect(processor)

      processor.onaudioprocess = (audio) => {
        var buffer = audio.inputBuffer.getChannelData(0)
        //--------------------------------------------
        // Transforming a Float32 buffer into an int16 buffer for processing
        let l = buffer.length
        let buf = new Int16Array(l/3)

        while (l--) {
          if (l % 3 === 0) {
            buf[l/3] = buffer[l] * 0xFFFF
          }
        }

        var audioStream = buf.buffer
        //--------------------------------------------
        socket.emit('audioStream', audioStream)

        socket.on('speechData', function (speechData) {
          console.log('in speechData')
          console.log(transcriptVal)
          if (speechData.results[0].isFinal) self.setState({transcript: transcriptVal})
        })
      }

    })
    .catch((error) => {
      console.log('navigatior catch block')
      console.log(error)
    })
  }



  stopSpeechStream () {
    console.log('Stopping voice recognition...')
    this.props.socket.emit('stopGoogleCloudSpeech')
    input.disconnect(processor)
    processor.disconnect(context.destination)
    AudioContext = null
    input        = null
    processor    = null
    context      = null
    console.log('--')
  }

  //--------------------------------------------------------------------------//



  render () {
    //---------------------------CONDITIONS-------------------------------------
    var feedbackComponent = (
      <ReusableSmartFeedback
        successFunction       = {this.feedbackSuccessFunction}
      />
    )



    //----------------------------RETURN----------------------------------------
    if (this.state.mainLocation === 'welcome') {
      return (
        <SmartWelcomePage
          updateUserDocument  = {this.updateUserDocument}
        />
      )

    } else {
      return (
        <div style = {{display: 'flex', minHeight: '100vh', height: '100%', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
          <DumbNavigationBar/>
          <FlatButton
            label = 'record'
            onClick = {() => this.startSpeechStream()}
            style = {{backgroundColor: 'rgb(150, 150, 150)'}}
          />
          <h1 style = {{textAlign: 'center'}}> {this.state.transcript} </h1>
          <FlatButton
            label = 'stop'
            onClick = {() => this.stopSpeechStream()}
            style = {{backgroundColor: 'rgb(150, 150, 150)'}}
          />
          <div style = {{minHeight: 'calc(100vh - 100px)', height: '100%'}}>
            <Route exact path = "/" render = {() =>
                <SmartDashboard
                />
            }/>
            <Route exact path = "/meeting" render = {() =>
              <SmartStandardMeeting
                defaultMeetingData = {this.state.defaultMeetingData}
              />
            }/>
            <Route exact path = "/meeting/custom-:id" render = {() =>
              <SmartCustomMeeting
                defaultMeetingData = {this.state.defaultMeetingData}
                userSettings       = {this.state.userSettings}
              />
            }/>
            <Route exact path = "/storage" render = {() =>
              <SmartDocumentStorage
              />
            }/>
            <Route exact path = "/data" render = {() =>
              <SmartProductivityData
              />
            }/>
            <Route exact path = "/help" render = {() =>
              <SmartHelp
              />
            }/>
            <Route  exact path = "/settings" render = {() =>
              <SmartUserSettings
                userSettings     = {this.state.userSettings}
                passUserSettings = {this.passUserSettings}
              />
            }/>
          </div>
          <div>
            <FlatButton
              label     = 'Send Feedback'
              style     = {{backgroundColor: '#ffac4d', color: 'white', width: '100%', display: 'flex', justifyContent: 'center', height: '50px'}}
              onClick   = {() => this.openFeedbackDialog()}
            />
            <ReusableDumbDialog
              dialogToggle          = {this.state.openFeedback}
              dialogToggleFunction  = {this.openFeedbackDialog}
              dialogComponent       = {feedbackComponent}
            />
            <Snackbar
              open              = {this.state.snackbarOpen}
              message           = 'Your feedback was sent straight to our Slack channel!'
              autoHideDuration  = {4000}
              onRequestClose    = {this.openSnackbar}
            />
          </div>
        </div>
      )
    }
  }
}

export default withRouter(SmartMain)



/*
getUserMedia({video: false, audio: true})
.then((stream) => {
  micStream.setStream(stream) // attached the MicrophoneStream instance (micStream) to the audio input of the user
  console.log('stream: ')
  console.log(stream)

})
.catch((error) => {
  console.log(error)
})

console.log('micStream: ')
console.log(micStream)

// When the microphone receives data, stream the buffer chunks to the server through the websocket
micStream.on('data', (bufferChunk) => {

  //write stream
  socket.emit('audioStream', bufferChunk)

  //read stream
  socket.on('speechData', function (speechData) {
    console.log('speechData received...')
    console.log(speechData)
    this.setState({transcript: speechData})
  })
  */
