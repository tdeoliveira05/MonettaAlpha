import React from 'react'
import {Route, indexRoute, withRouter} from 'react-router-dom'
// import PropTypes    from 'prop-types';
import SmartStandardMeeting from './SmartMeetingTab/SmartStandardMeeting.js'
import SmartCustomMeeting from './SmartMeetingTab/SmartCustomMeeting.js'
import SmartMeetingTemplate from './SmartMeetingTab/SmartMeetingTemplate.js'
import DumbMeetingTab from '../../DumbComponents/Main/DumbMeetingTab.js'

class SmartMeetingTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userDoc: this.props.userDoc,
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
      }
    }
  }

  componentDidMount () {
    const self = this
    socket.on('response/secure/userDocument/getUserDoc', function (data) {
      self.setState({userDoc: data})
    })
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //---------------------------RETURN-----------------------------------------
    // because {indexRoute} from 'react-router-dom' apparently cant easily take
    // props for the child component. Gives user a choice between hosting a standard meeting or creating templates
    if (this.props.location.pathname === '/meeting') {
      return (
        <div style = {{height: '100%'}}>
          <DumbMeetingTab
            history = {this.props.history}
          />
        </div>
      )
    } else {
      // react router's "/:templateId?" means that the templateId parameter is optional
      return (
        <div style = {{width: '100%', height: '100%'}}>
          <Route exact path = "/meeting/templates/:templateId?" render = {() =>
            <SmartMeetingTemplate
              userDoc = {this.props.userDoc}
            />
          }/>

          <Route exact path = "/meeting/standard" render = {() =>
            <SmartStandardMeeting
              defaultMeetingData = {this.state.defaultMeetingData}
            />
          }/>
          <Route exact path = "/meeting/schedule" render = {() =>
            <h1> Schedule your meetings here </h1>
          }/>
          <Route exact path = "/meeting/custom/:templateId" render = {() =>
            <SmartCustomMeeting
              defaultMeetingData = {this.state.defaultMeetingData}
              userPreferences    = {this.props.userPreferences}
            />
          }/>
        </div>
      )
    }
  }
}

export default withRouter(SmartMeetingTab)
//-------------------------------EXPECTED PROP TYPES----------------------------
// SmartMeetingTab.propTypes = {
//   propName: PropTypes.type,
  //Example: currentFolder: PropTypes.string.isRequired,
// };
