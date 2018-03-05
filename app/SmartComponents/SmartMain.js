/************************** SERVER CALLS PRESENT*****************************/
import React                  from 'react'
import FlatButton             from 'material-ui/FlatButton'
import axios                  from 'axios'
import Snackbar               from 'material-ui/Snackbar'
import { Route, withRouter }  from 'react-router-dom'
import { Howl, Howler }       from 'howler'

import SmartDocumentStorage   from './SmartMain/SmartDocumentStorage.js'
import SmartProductivityData  from './SmartMain/SmartProductivityData.js'
import SmartUserSettings      from './SmartMain/SmartUserSettings.js'
import SmartWelcomePage       from './SmartMain/SmartWelcomePage.js'
import DumbNavigationBar      from '../DumbComponents/Main/DumbNavigationBar'
import SmartDashboard         from './SmartMain/SmartDashboard.js'
import SmartHelp              from './SmartMain/SmartHelp.js'
import SmartYourVoice         from './SmartMain/SmartYourVoice.js'
import SmartMeetingTab        from './SmartMain/SmartMeetingTab.js'

import ReusableSmartFeedback  from '../Reusable/Smart/ReusableSmartFeedback.js'
import ReusableDumbDialog     from '../Reusable/Dumb/ReusableDumbDialog.js'

//for activating mic + STT----------------------------------------------------
// TESTING PUSH

import getUserMedia           from 'get-user-media-promise'
import MicrophoneStream       from 'microphone-stream'
let    resampler              = require('audio-resampler')
var    fileSaver              = require('file-saver')
const  WavEncoder             = require("wav-encoder");
var    fs                     = require("fs");
var    context, processor, input
var    bufferInterval
var    AudioContext           = window.AudioContext || window.webkitAudioContext

//-----------------------------------------------------------------------------
class SmartMain extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      mainLocation: 'internal',
      path: 'teamMeeting',
      openFeedback: false,
      snackbarOpen: false,
      quickMeeting: false,
      transcript: '',
      timeInApp: 0,
      userDoc: {},
      hotWordDetected: false,
    }

    this.updateUserDocument       = this.updateUserDocument.bind(this)
    this.updateMainLocation       = this.updateMainLocation.bind(this)
    this.openFeedbackDialog       = this.openFeedbackDialog.bind(this)
    this.feedbackSuccessFunction  = this.feedbackSuccessFunction.bind(this)
    this.openSnackbar             = this.openSnackbar.bind(this)
    this.activatePath             = this.activatePath.bind(this)

    this.startHotWordStream       = this.startHotWordStream.bind(this)
    this.stopHotWordStream        = this.stopHotWordStream.bind(this)
    this.startSpeechStream        = this.startSpeechStream.bind(this)
    this.stopSpeechStream         = this.stopSpeechStream.bind(this)


  }

  componentDidMount () {
    const self = this

    this.updateMainLocation()
    // Start timer to track total time spent in app and update the state every second
    this.interval = setInterval(function () {
      if (self.props.appLocation !== 'home') {
        socket.emit('userLoginProtocols')
        socket.emit('secure/userDocument/getUserDoc')
      }

    }, 1000)

    socket.on('response/secure/userDocument/getUserDoc', function (data) {
      self.setState({userDoc: data})
    })

    socket.on('hotWordAPIResponse', (response) => {
      if(response.search('monetta') > -1 && !self.state.hotWordDetected) {
        // console.log('SUCCESSSSSSSSS')
        self.setState({hotWordDetected: true})
        this.stopHotWordStream()
        this.startSpeechStream()
      }
      self.setState({transcript: response})
    })

    socket.on('speechData', (speechData) => {

      if (speechData.error) {
        // If there is an error, console.log() it
        console.log('Error detected: ')
        console.log(speechData.error.message)

      } else if (!speechData.results[0].isFinal) {
        // try setting the state as the phrase is built
        self.setState({transcript: speechData.results[0].alternatives[0].transcript})

      } else if (speechData.results[0].isFinal) {
        // if google says it is final, update this.state.transcript to store the transcript
        // console.log('isFinal === true')
        // console.log(speechData.results[0].alternatives[0])
        var transcriptVal = speechData.results[0].alternatives[0].transcript
        // if it is final, end the google stream and reactivate hot word inference mode
        this.stopSpeechStream()
        this.setState({hotWordDetected: false})
        this.startHotWordStream()

        // only update the state when the current transcript is different than the one being received
        if (self.state.transcript !== transcriptVal) {
          self.setState({transcript: transcriptVal})
        }

      } else {
        // If this triggers, investigate it - not supposed to end up in this else block
        console.log('Nothing happened - ')
        console.log(speechData)
      }
    })
  }

  componentWillUnmount () {
    console.log('unmounting')
    clearInterval(this.interval)
  }

  componentDidUpdate () {

    const self = this

    socket.emit('userURLActivityProtocols', {props: self.props})
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

  startHotWordStream () {
    // Check this with Safari (https://www.npmjs.com/package/microphone-stream)
    // create a read stream that will read the .raw audio file being created by the audio input and send it up to the server
    console.log('Starting hot word inference...')

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

      var recBuffers = [],
          recBuffersOffset = [],
          recLength = 0,
          recLengthOffset = 0,
          resetInterval = 1000;

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

      var encodeEmitAndResetSecond = () => {
        let mergedOffsetBuffer = mergeBuffers(recBuffersOffset, recLengthOffset)

        // Encoding audiobuffer to wav
        const dataToEncode = {
          sampleRate: 16000,
          channelData: [mergedOffsetBuffer]
        };
        WavEncoder.encode(dataToEncode).then((encodedWavOffset) => {
          // Uncomment to save audio locally (for debugging)
          // var wavBlobOffset = new Blob([encodedWavOffset], {type: "audio/wav"})
          // fileSaver.saveAs(wavBlobOffset, 'sampleaudio2.wav')
          //Prepare buffer for transmission to hotWordAPI
          var wavBufferOffset = new Buffer.from(encodedWavOffset).toString('base64')
          socket.emit('checkForHotWord', wavBufferOffset)
        });

        // Emptying the buffer and resetting buffer length
        recBuffersOffset = []
        recLengthOffset -= recLengthOffset
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

        setTimeout(encodeEmitAndResetSecond, resetInterval/2)
      }

      // Encodes buffer to .wav and sends to API at specified interval
      bufferInterval = setInterval(encodeEmitAndResetBuffer, resetInterval)

      processor.onaudioprocess = (audio) => {
        // Resampling audio(44.1kHz --> 16kHz)
        resampler(audio.inputBuffer, 16000, (event) => {
          let resampledBuffer = event.getAudioBuffer()
          recBuffers.push(resampledBuffer.getChannelData(0))
          recLength += resampledBuffer.getChannelData(0).length
          recBuffersOffset.push(resampledBuffer.getChannelData(0))
          recLengthOffset += resampledBuffer.getChannelData(0).length
        })

        // socket.on('hotWordAPIResponse', (response) => {
        //   if(response.search('monetta') > -1) {
        //     console.log('SUCCESSSSSSSSS')
        //     // this.stopHotWordStream()
        //     // this.startSpeechStream()
        //   }
        //   self.setState({transcript: response})
        // })
      }
    })
    .catch((error) => {
      console.log('navigatior catch block')
      console.log(error)
    })
  }

  stopHotWordStream () {
    console.log('Stopping hot word inference...')
    socket.emit('stopHotWordInference')
    context.close()
    processor.disconnect(context.destination)
    input.disconnect(processor)
    input        = null
    processor    = null
    context      = null
    console.log('--')
    clearInterval(bufferInterval)
  }

  startSpeechStream () {
    // Check this with Safari (https://www.npmjs.com/package/microphone-stream)
    // create a read stream that will read the .raw audio file being created by the audio input and send it up to the server
    console.log('Starting Google API...')

    //initialize speech api and broaden global scope
    socket.emit('startGoogleCloudSpeech')

    const self = this

    // code used from https://github.com/vin-ni/Google-Cloud-Speech-Node-Socket-Playground
    // AudioContext already defined, grabs the audio of the window
    // initiates an instance
    // Can't specify sampleRate here
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

        //--------------------------------------------
      }

    })
    .catch((error) => {
      console.log('navigatior catch block')
      console.log(error)
    })
  }

  stopSpeechStream () {
    console.log('Stopping Google API...')
    socket.emit('stopGoogleCloudSpeech')
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
              onClick = {() => this.startHotWordStream()}
              style = {{backgroundColor: 'rgb(150, 150, 150)'}}
            />
            <h1 style = {{textAlign: 'center'}}> {this.state.transcript} </h1>
            <FlatButton
              label = 'stop'
              onClick = {() => this.stopHotWordStream()}
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
                startHotWordStream = {this.startHotWordStream}
                userDoc            = {this.state.userDoc}
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
                userDoc             = {this.state.userDoc}
                signOut             = {this.props.signOut}
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
