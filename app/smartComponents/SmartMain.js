
import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar'
import {Link, Route, IndexRoute} from 'react-router-dom'

import SmartTeamMeeting from './SmartMain/SmartTeamMeeting.js'
import SmartDocumentStorage from './SmartMain/SmartDocumentStorage.js'
import SmartProductivityData from './SmartMain/SmartProductivityData.js'
import SmartUserSettings from './SmartMain/SmartUserSettings.js'
import SmartWelcomePage from './SmartMain/SmartWelcomePage.js'
import DumbNavigationBar from '../DumbComponents/Main/DumbNavigationBar'
import SmartDashboard from './SmartMain/SmartDashboard.js'
import SmartHelp from './SmartMain/SmartHelp.js'

import ReusableSmartFeedback from '../Reusable/Smart/ReusableSmartFeedback.js'
import ReusableDumbDialog from '../Reusable/Dumb/ReusableDumbDialog.js'

export default class SmartMain extends React.Component {
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
      snackbarOpen: false
    }

    this.handleChangeTabValue     = this.handleChangeTabValue.bind(this)
    this.updateUserDocument       = this.updateUserDocument.bind(this)
    this.updateMainLocation       = this.updateMainLocation.bind(this)
    this.openFeedbackDialog       = this.openFeedbackDialog.bind(this)
    this.feedbackSuccessFunction  = this.feedbackSuccessFunction.bind(this)
    this.openSnackbar             = this.openSnackbar.bind(this)
    this.activatePath             = this.activatePath.bind(this)
  }

  componentDidMount () {
    this.updateMainLocation()
  }

  updateMainLocation () {
    if (localStorage.fullName.includes('undefined') || localStorage.fullName === '') {
      this.setState({mainLocation: 'welcome'})
      console.log('updateMainLocation(): mainLocation set to welcome')
    }
  }

  updateUserDocument(updateObjVal) {
    const self = this
    axios.post('http://localhost:8080/userDocument/update', {
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
          location              = {'General(SmartMain.js), Tab value: ' + this.state.tabValue}
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
          <div style = {{height: '100%'}}>
            <DumbNavigationBar/>
            <div style = {{height: '100%'}}>
              <Route exact path = "/" render = {() =>
                  <SmartDashboard
                  />
              }/>
              <Route path = "/meeting" render = {() =>
                  <SmartTeamMeeting
                    defaultMeetingData = {this.state.defaultMeetingData}
                  />
              }/>
              <Route path = "/storage" render = {() =>
                <SmartDocumentStorage
                />
              }/>
              <Route path = "/data" render = {() =>
                <SmartProductivityData
                />
              }/>
              <Route path = "/help" render = {() =>
                <SmartHelp
                />
              }/>
              <Route path = "/settings" render = {() =>
                <SmartUserSettings
                />
              }/>
            </div>
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

/*
<div style = {{display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'space-between'}}>
  <div style = {{height: '100%'}}>
    <FlatButton
      label = 'Sign out'
      style = {{backgroundColor: '#6699ff', color: 'white', width: '100%', display: 'flex', justifyContent: 'center', height: '5%'}}
      onClick = {() => this.props.signOut()}
    />
    <Tabs value={this.state.tabValue} onChange={this.handleChangeTabValue} style = {{height: '90%'}}>
      <Tab label='Team Meeting' value='Meeting' icon={<FontIcon className='material-icons'>question_answer</FontIcon>}>
        <SmartTeamMeeting
          handleChangeTabValue = {this.handleChangeTabValue}
          defaultMeetingData   = {this.state.defaultMeetingData}
        />
      </Tab>
      <Tab label='Document Storage' value='Storage' icon={<FontIcon className='material-icons'>cloud</FontIcon>}>
        <SmartDocumentStorage
        />
      </Tab>
      <Tab label='Productivity Data' value='Data' icon={<FontIcon className='material-icons'>trending_up</FontIcon>}>
        <SmartProductivityData
        />
      </Tab>
      <Tab label='User Settings' value='Settings' icon={<FontIcon className='material-icons'>settings_applications</FontIcon>}>
        <SmartUserSettings
        />
      </Tab>
    </Tabs>
  </div>
  <div>
    <FlatButton
      label     = 'Send Feedback'
      style     = {{backgroundColor: '#ffac4d', color: 'white', width: '100%', display: 'flex', justifyContent: 'center', height: '5%'}}
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
*/
