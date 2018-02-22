/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar'
import { Route, withRouter} from 'react-router-dom'

import SmartDocumentStorage from './SmartMain/SmartDocumentStorage.js'
import SmartProductivityData from './SmartMain/SmartProductivityData.js'
import SmartUserSettings from './SmartMain/SmartUserSettings.js'
import SmartWelcomePage from './SmartMain/SmartWelcomePage.js'
import DumbNavigationBar from '../DumbComponents/Main/DumbNavigationBar'
import SmartDashboard from './SmartMain/SmartDashboard.js'
import SmartHelp from './SmartMain/SmartHelp.js'
import SmartYourVoice from './SmartMain/SmartYourVoice.js'
import SmartMeetingTab from './SmartMain/SmartMeetingTab.js'

import ReusableSmartFeedback from '../Reusable/Smart/ReusableSmartFeedback.js'
import ReusableDumbDialog from '../Reusable/Dumb/ReusableDumbDialog.js'

//for activating mic + STT----------------------------------------------------
// TESTING PUSH

import getUserMedia from 'get-user-media-promise'
import MicrophoneStream from 'microphone-stream'
let resampler = require('audio-resampler')
var toWav = require('audiobuffer-to-wav')
var fileSaver = require('file-saver')
const WavEncoder = require("wav-encoder");
var fs = require("fs");
var context, processor, input
var bufferInterval
var AudioContext = window.AudioContext || window.webkitAudioContext

//-----------------------------------------------------------------------------
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
      userPreferences: this.props.userPreferences,
      quickMeeting: false,
      transcript: '',
      timeInApp: 0,
      userDoc: {}
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
    const self = this
    this.updateMainLocation()
    // Start timer to track total time spent in app and update the state every second
<<<<<<< Updated upstream
    this.interval = setInterval(function () {
=======
    var timerInterval = setInterval(() => {
>>>>>>> Stashed changes
      if (self.props.appLocation !== 'home') {
        socket.emit('userLoginProtocols')
        socket.emit('secure/userDocument/getUserDoc')
      }

    }, 1000)

    socket.on('response/secure/userDocument/getUserDoc', function (data) {
      self.setState({userDoc: data})
    })
  }

  componentWillUnmount () {
    console.log('unmounting')
    clearInterval(this.interval)
  }

  componentWillReceiveProps (nextProps) {
    // App.js needs more time to initialize user settings due to the asynchronous nature of the code
    // this line of code will ensure that once App.js re-sets its own state with the initial version of the user's settings, the
    // change will pass down through a new userPreferences prop and smartMain.js will update its own state accordingly to propagate the user settings
    if (nextProps.userPreferences !== this.props.userPreferences) this.setState({userPreferences: nextProps.userPreferences})
  }

  componentDidUpdate () {

    const self = this

    socket.emit('userURLActivityProtocols', {props: self.props})
  }

  passUserSettings (userPreferencesVal) {
    this.setState({userPreferences: userPreferencesVal})
  }

  updateMainLocation () {
    if (localStorage.fullName.includes('undefined') || localStorage.fullName === '') {
      this.setState({mainLocation: 'welcome'})
      console.log('updateMainLocation(): mainLocation set to welcome')
    }
  }

  updateUserDocument(updateObjVal) {
    const self = this

    socket.emit('/secure/userDocument/updateInfo', {updateObj: updateObjVal})

    socket.on('response/secure/userDocument/updateInfo', (successObj) => {
      console.log(successObj)

      if (successObj.success) {
        localStorage.username = successObj.username
        localStorage.fullName = successObj.fullName
        self.setState({mainLocation: 'internal'})

      } else {
        console.log(successObj.errorText)
      }

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
    socket.emit('startHotWordInference')
    // socket.emit('startGoogleCloudSpeech')

    const self = this

    // code used from https://github.com/vin-ni/Google-Cloud-Speech-Node-Socket-Playground
    // AudioContext already defined, grabs the audio of the window
    // initiates an instance
    // Can't specify sampleRate here
    context = new AudioContext()

    //buffer Process
    processor = context.createScriptProcessor(16384, 1, 1)
    processor.connect(context.destination)
    context.resume()


    navigator.mediaDevices.getUserMedia({video: false, audio: true})
    .then((stream) => {
      input = context.createMediaStreamSource(stream)
      input.connect(processor)

      var buffer,
          recBuffers = [],
          recLength = 0;

      // Merging the audio buffers
      var mergeBuffers = (recBuffers, recLength) => {
        var result = new Float32Array(recLength);
        var offset = 0;
        for (var i = 0; i < recBuffers.length; i++){
          result.set(recBuffers[i], offset);
          offset += recBuffers[i].length;
        }
        return result
      }

      var encodeEmitAndResetBuffer = () => {
        let mergedBuffer = mergeBuffers(recBuffers, recLength)

        // Encoding audiobuffer to wav
        const dataToEncode = {
          sampleRate: 16000,
          channelData: [mergedBuffer]
        };
        WavEncoder.encode(dataToEncode).then((encodedWav) => {
          // Uncomment to save audio locally (for debugging)
          // var wavBlob = new Blob([encodedWav], {type: "audio/wav"})
          // fileSaver.saveAs(wavBlob, 'sampleaudio.wav')
          //Prepare buffer for transmission to hotWordAPI
          var wavBuffer = new Buffer.from(encodedWav).toString('base64')
          socket.emit('checkForHotWord', wavBuffer)
        });

        // Emptying the buffer and resetting buffer length
        recBuffers = []
        recLength -= recLength
      }

      // Encodes buffer to .wav and sends to API at specified interval
      bufferInterval = setInterval(encodeEmitAndResetBuffer, 900)

      processor.onaudioprocess = (audio) => {
        // Resampling audio(44.1kHz --> 16kHz)
        resampler(audio.inputBuffer, 16000, (event) => {
          let resampledBuffer = event.getAudioBuffer()
          recBuffers.push(resampledBuffer.getChannelData(0))
          recLength += resampledBuffer.getChannelData(0).length
          buffer = resampledBuffer.getChannelData(0)
        })

        socket.on('hotWordAPIResponse', (response) => {
          self.setState({transcript: response.split(' ')[0]})
        })
        //--------------------------------------------
        // Transforming a Float32 buffer into an int16 buffer for processing

        // let l = buffer.length
        // let buf = new Int16Array(l/3)
        //
        // while (l--) {
        //   if (l % 3 === 0) {
        //     buf[l/3] = buffer[l] * 0xFFFF
        //   }
        // }
        //
        // var audioStream = buf.buffer
        //--------------------------------------------
        // this.props.socket.emit('audioStream', audioStream)
        //
        // this.props.socket.on('speechData', function (speechData) {
        //
        //   if (speechData.error) {
        //     // If there is an error, console.log() it
        //     console.log('Error detected: ')
        //     console.log(speechData.error.message)
        //
        //   } else if (!speechData.results[0].isFinal) {
        //     // try setting the state as the phrase is built
        //     self.setState({transcript: speechData.results[0].alternatives[0].transcript})
        //
        //   } else if (speechData.results[0].isFinal) {
        //     // if google says it is final, update this.state.transcript to store the transcript
        //     console.log('isFinal === true')
        //     console.log(speechData.results[0].alternatives[0])
        //     var transcriptVal = speechData.results[0].alternatives[0].transcript
        //
        //     // only update the state when the current transcript is different than the one being received
        //     if (self.state.transcript !== transcriptVal) {
        //       self.setState({transcript: transcriptVal})
        //     }
        //
        //   } else {
        //     // If this triggers, investigate it - not supposed to end up in this else block
        //     console.log('Nothing happened - ')
        //     console.log(speechData)
        //   }
        // })
        //--------------------------------------------
      }

    })
    .catch((error) => {
      console.log('navigatior catch block')
      console.log(error)
    })
  }



  stopSpeechStream () {
    console.log('Stopping voice recognition...')
    socket.emit('stopHotWordInference')
    // this.props.socket.emit('stopGoogleCloudSpeech')
    context.close()
    processor.disconnect(context.destination)
    input.disconnect(processor)
    input        = null
    processor    = null
    context      = null
    console.log('--')
    clearInterval(bufferInterval)
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
          <div style = {{minHeight: 'calc(100vh - 100px)', height: '100%'}}>
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
            <Route exact path = "/" render = {() =>
                <SmartDashboard
                  userDoc = {this.state.userDoc}
                />
            }/>
            <Route path = "/meeting" render = {() =>
              <SmartMeetingTab
                defaultMeetingData = {this.state.defaultMeetingData}
                userPreferences    = {this.state.userPreferences}
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
            <Route exact path = "/yourvoice" render = {() =>
              <SmartYourVoice
              />
            }/>
            <Route exact path = "/help" render = {() =>
              <SmartHelp
              />
            }/>
            <Route  exact path = "/settings" render = {() =>
              <SmartUserSettings
                userPreferences  = {this.state.userPreferences}
                passUserSettings = {this.passUserSettings}
                signOut          = {this.props.signOut}
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

-------------------------------------------------------------------------------
Recording html elements


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


--------------------------------------------------------------------------------
alternative audio recording method


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
