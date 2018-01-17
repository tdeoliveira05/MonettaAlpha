import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'

import SmartTeamMeeting from './SmartFeatures/SmartTeamMeeting.js'
import SmartDocumentStorage from './SmartFeatures/SmartDocumentStorage.js'
import SmartProductivityData from './SmartFeatures/SmartProductivityData.js'
import SmartUserSettings from './SmartFeatures/SmartUserSettings.js'

export default class SmartMain extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      tabValue: 'Storage'
    }

    this.handleChangeTabValue = this.handleChangeTabValue.bind(this)
  }

  handleChangeTabValue (value) {
    this.setState({tabValue: value})
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return (
      <div>
        <Tabs value={this.state.tabValue} onChange={this.handleChangeTabValue}>
          <Tab label='Team Meeting' value='Meeting' icon={<FontIcon className='material-icons'>question_answer</FontIcon>}>
            <SmartTeamMeeting
              handleChangeTabValue = {this.handleChangeTabValue}
              userTokenObj         = {this.props.userTokenObj}
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
    )
  }
}
