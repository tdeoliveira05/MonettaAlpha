
import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios'

import SmartTeamMeeting from './SmartMain/SmartTeamMeeting.js'
import SmartDocumentStorage from './SmartMain/SmartDocumentStorage.js'
import SmartProductivityData from './SmartMain/SmartProductivityData.js'
import SmartUserSettings from './SmartMain/SmartUserSettings.js'

import SmartWelcomePage from './SmartMain/SmartWelcomePage.js'

import ReusableSmartFeedback from '../Reusable/Smart/ReusableSmartFeedback.js'
import ReusableDumbDialog from '../Reusable/Dumb/ReusableDumbDialog.js'

export default class SmartMain extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      mainLocation: 'internal',
      tabValue: 'Meeting',
      defaultMeetingData: {
        title: '',
        host: {
          fullName: this.props.userTokenObj.fullName,
          username: this.props.userTokenObj.username
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
      openFeedback: false
    }

    this.handleChangeTabValue = this.handleChangeTabValue.bind(this)
    this.updateUserDocument   = this.updateUserDocument.bind(this)
    this.updateMainLocation   = this.updateMainLocation.bind(this)
    this.openFeedbackDialog   = this.openFeedbackDialog.bind(this)
  }

  componentDidMount () {
    this.updateMainLocation()
  }

  updateMainLocation () {
    if (this.props.userTokenObj.fullName.includes('undefined')) {
      this.setState({mainLocation: 'welcome'})
      console.log('updateMainLocation(): mainLocation set to welcome')
    }
  }

  updateUserDocument(updateObjVal) {
    const self = this
    axios.post('http://localhost:8080/userDocument/update', {
      userTokenObj: this.props.userTokenObj,
      updateObj: updateObjVal
    })
    .then((successObj) => {
      if (successObj.data.success) {
        this.props.submitUserTokenObj(successObj.data.userTokenObj)
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

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var feedbackComponent = (
        <ReusableSmartFeedback
          userTokenObj = {this.props.userTokenObj}
          location = {'General(SmartMain.js), Tab value: ' + this.state.tabValue}
        />
      )

    //----------------------------RETURN----------------------------------------
    if (this.state.mainLocation === 'welcome') {
      return (
        <SmartWelcomePage
          userTokenObj        = {this.props.userTokenObj}
          updateUserDocument  = {this.updateUserDocument}
        />
      )

    } else {
      return (
        <div style = {{display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'space-between'}}>
          <div>
            <FlatButton
              label = 'Sign out'
              style = {{backgroundColor: '#6699ff', color: 'white', width: '100%', display: 'flex', justifyContent: 'center'}}
              onClick = {() => this.props.changeAppLocation('home')}
            />
            <Tabs value={this.state.tabValue} onChange={this.handleChangeTabValue} >
              <Tab label='Team Meeting' value='Meeting' icon={<FontIcon className='material-icons'>question_answer</FontIcon>}>
                <SmartTeamMeeting
                  handleChangeTabValue = {this.handleChangeTabValue}
                  userTokenObj         = {this.props.userTokenObj}
                  defaultMeetingData   = {this.state.defaultMeetingData}
                />
              </Tab>
              <Tab label='Document Storage' value='Storage' icon={<FontIcon className='material-icons'>cloud</FontIcon>}>
                <SmartDocumentStorage
                  userTokenObj         = {this.props.userTokenObj}
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
              style     = {{backgroundColor: '#ffac4d', color: 'white', width: '100%', display: 'flex', justifyContent: 'center'}}
              onClick   = {() => this.openFeedbackDialog()}
            />
            <ReusableDumbDialog
              dialogToggle          = {this.state.openFeedback}
              dialogToggleFunction  = {this.openFeedbackDialog}
              dialogComponent       = {feedbackComponent}
            />
          </div>
        </div>
      )
    }
  }
}
