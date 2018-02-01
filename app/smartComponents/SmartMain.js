/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar'
import {Link, Route, IndexRoute, withRouter, Switch, BrowserRouter as Router} from 'react-router-dom'

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
      quickMeeting: false
    }

    this.handleChangeTabValue     = this.handleChangeTabValue.bind(this)
    this.updateUserDocument       = this.updateUserDocument.bind(this)
    this.updateMainLocation       = this.updateMainLocation.bind(this)
    this.openFeedbackDialog       = this.openFeedbackDialog.bind(this)
    this.feedbackSuccessFunction  = this.feedbackSuccessFunction.bind(this)
    this.openSnackbar             = this.openSnackbar.bind(this)
    this.activatePath             = this.activatePath.bind(this)
    this.passUserSettings         = this.passUserSettings.bind(this)
  }

  componentDidMount () {
    this.updateMainLocation()
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

  handleChangeTabValue (value) {
    this.setState({tabValue: value})
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

*/
