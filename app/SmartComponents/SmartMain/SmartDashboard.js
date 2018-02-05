/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbDashboard from '../../DumbComponents/Main/DumbDashboard.js'

class SmartDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.getAllSavedMeetings = this.getAllSavedMeetings.bind(this)
    this.getAllMeetingTemplates = this.getAllMeetingTemplates.bind(this)

  }

  getAllSavedMeetings () {

  }

  getAllMeetingTemplates () {

  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    var templateList = [{name: 'Quick Meeting'}]

    var scheduledList = [{name: 'Financial Review'}]

    var dataList = [
      {header: '17', label: 'meetings held'},
      {header: '3.9', label: 'hours saved'},
      {header: '$456', label: 'CAD saved'}
    ]
    //----------------------------RETURN----------------------------------------
    return(
      <div style = {{height: '100%', width: '100%'}}>
        <DumbDashboard
          history = {this.props.history}
          templateList = {templateList}
          scheduledList = {scheduledList}
          dataList = {dataList}
        />
      </div>
    )
  }
}

export default withRouter(SmartDashboard)
