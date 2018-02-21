import React from 'react'
import {Route, indexRoute, withRouter} from 'react-router-dom'
// import PropTypes    from 'prop-types';
import SmartStandardMeeting from './SmartStandardMeeting.js'
import SmartCustomMeeting from './SmartCustomMeeting.js'
import DumbMeetingTabChoice from '../../DumbComponents/Main/DumbMeetingTabChoice.js'

class SmartMeetingTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------


    //---------------------------RETURN-----------------------------------------
    // because {indexRoute} from 'react-router-dom' apparently cant easily take
    // props for the child component. Gives user a choice between hosting a standard meeting or creating templates
    if (this.props.location.pathname === '/meeting') {
      return (
        <div style = {{height: '100%'}}>
          <DumbMeetingTabChoice
            history = {this.props.history}
          />
        </div>
      )
    } else {
      return (
        <div>
          <Route exact path = "/meeting/templates" render = {() =>
            <h1> create, view and edit templates here </h1>
          }/>
          <Route exact path = "/meeting/custom-:templateId" render = {() =>
            <SmartCustomMeeting
              defaultMeetingData = {this.props.defaultMeetingData}
              userPreferences    = {this.props.userPreferences}
            />
          }/>
          <Route exact path = "/meeting/standard" render = {() =>
            <SmartStandardMeeting
              defaultMeetingData = {this.props.defaultMeetingData}
            />
          }/>
          <Route exact path = "/meeting/schedule" render = {() =>
            <h1> Schedule your meetings here </h1>
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
