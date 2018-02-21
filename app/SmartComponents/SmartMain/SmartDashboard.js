/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbDashboard from '../../DumbComponents/Main/DumbDashboard.js'

class SmartDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userDoc: this.props.userDoc
    }

    this.getAllSavedMeetings = this.getAllSavedMeetings.bind(this)
    this.getAllMeetingTemplates = this.getAllMeetingTemplates.bind(this)

  }

  componentDidMount () {
    // this will activate the response socket routes placed in the code
    socket.emit('/secure/userDocument/getUserDoc')
  }

  getAllSavedMeetings () {

  }

  getAllMeetingTemplates () {

  }

  render () {
    console.log(this.state)
    //---------------------------CONDITIONS-------------------------------------

    var templateList = [{
      name: 'Quick Meeting',
      customId: 'quick'
    },{
      name: 'Standup Meeting',
      customId: 'standup'
    },{
      name: 'Finance Review Meeting',
      customId: 'finance-review'
    },{
      name: '1-on-1 Meeting',
      customId: '1-on-1'
    }]

    var scheduledList = [{
      name: 'Financial Review',
      date: '09/08/2018'
    },{
      name: 'Financial Review',
      date: '09/08/2018'
    },{
      name: 'Financial Review',
      date: '09/08/2018'
    },{
      name: 'Financial Review',
      date: '09/08/2018'
    }]

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
