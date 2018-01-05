import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'

import ReusableSmartTabBar from '../reusable/smart/ReusableSmartTabBar.js'
import SmartTeamMeeting from './SmartTeamMeeting.js'
import SmartDocumentStorage from './SmartDocumentStorage.js'

export default class SmartMain extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      tabValue: 'Meeting'
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
              />
          </Tab>
          <Tab label='Document Storage' value='Storage' icon={<FontIcon className='material-icons'>cloud</FontIcon>}>
            <SmartDocumentStorage
              />
          </Tab>
        </Tabs>
      </div>
    )
  }
}
