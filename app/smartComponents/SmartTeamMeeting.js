import React from 'react'
import Paper from 'material-ui/Paper'

import DumbPrepareMeeting from '../dumbComponents/meeting/DumbPrepareMeeting.js'
import DumbConductMeeting from '../dumbComponents/meeting/DumbConductMeeting.js'
import DumbReviewMinutes from '../dumbComponents/meeting/DumbReviewMinutes.js'

export default class SmartMeetingDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingIndex: 0,
      meetingData: {
        title: '',
        date: '',
        members: [],
        actionItems: [],
        goals: [],
        generalNotes: []
      }
    }

    this.handleIndexChange        = this.handleIndexChange.bind(this)
    this.handleFinishedMeeting    = this.handleFinishedMeeting.bind(this)
    this.handleChangeMeetingData  = this.handleChangeMeetingData.bind(this)
    this.handleChangeTempData     = this.handleChangeTempData.bind(this)
    this.createListItems          = this.createListItems.bind(this)
  }

  handleChangeMeetingData (event) {
    // The following three lines of code use immutability helpers---------------
    /*
    This is to allow this function to ADD to the this.state.meetingData obj by copying
    it into a variable, modifying the variable, overwriting the old meetingData object
    with a new (modified) meetingData object. If this were not done, every time the user
    switched from filling out one text field to the other, the previous text field
    value would be deleted and this.state.meetingData would be assigned to the new value

    The alternative incorrect function can be seen by replacing the following
    three lines with the usual single line function call for an onChange handler:

    this.setState({meetingData: {[event.target.name]: event.target.value}})
    */
    var newMeetingDataObj = this.state.meetingData // a new object of this.state.meetingData is created
    newMeetingDataObj[event.target.name] = event.target.value // new object is modified
    this.setState(newMeetingDataObj) // overwrites the old this.state.meetingData obj with the new object
    //--------------------------------------------------------------------------
    console.log('ONCHANGE (meetingData) -> ' + event.target.name + ' : ' + event.target.value)
  }

  handleChangeTempData (event) {
    // The following three lines of code use immutability helpers---------------
    /*
    This is to allow this function to ADD to the this.state.meetingData obj by copying
    it into a variable, modifying the variable, overwriting the old meetingData object
    with a new (modified) meetingData object. If this were not done, every time the user
    switched from filling out one text field to the other, the previous text field
    value would be deleted and this.state.meetingData would be assigned to the new value

    The alternative incorrect function can be seen by replacing the following
    three lines with the usual single line function call for an onChange handler:

    this.setState({meetingData: {[event.target.name]: event.target.value}})
    */
    var newTempDataObj = this.state.tempData // a new object of this.state.meetingData is created
    newTempDataObj[event.target.name] = event.target.value // new object is modified
    this.setState(newTempDataObj) // overwrites the old this.state.meetingData obj with the new object
    //--------------------------------------------------------------------------
    console.log('ONCHANGE (tempData) -> ' + event.target.name + ' : ' + event.target.value)
  }

  handleIndexChange(direction) {
    switch (direction) {
      case 'forward':
        this.setState({meetingIndex: this.state.meetingIndex + 1})
        break

      case 'backward':
        this.setState({meetingIndex: this.state.meetingIndex - 1})
        break

      case 'finished':
        this.handleFinishedMeeting()
        break
    }
  }

  handleFinishedMeeting () {
    console.log('Submitting: ' + this.state.meetingData)
  }

  createListItems () {

  }

  render () {
    //---------------------------VARIABLE CREATION------------------------------
    var listItems = this.createListItems()


    //---------------------------CONDITIONS-------------------------------------

    switch (this.state.meetingIndex) {
      case 0:
        var MeetingHeader     = 'Prepare the Meeting'
        var MeetingComponent  = (
          <DumbPrepareMeeting
            handleIndexChange       = {this.handleIndexChange}
            handleChangeMeetingData = {this.handleChangeMeetingData}
            handleChangeTempData    = {this.handleChangeTempData}
            meetingTitle            = {this.state.meetingData.title}
            />
        )
        break

      case 1:
        var MeetingHeader     = 'Conduct the Meeting'
        var MeetingComponent  = (
          <DumbConductMeeting
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            handleChangeMeetingData = {this.handleChangeMeetingData}
            />
        )
        break

      case 2:
        var MeetingHeader     = 'Review the Minutes'
        var MeetingComponent  = (
          <DumbReviewMinutes
            handleIndexChange       = {this.handleIndexChange}
            meetingData             = {this.state.meetingData}
            handleChangeMeetingData = {this.handleChangeMeetingData}
            />
        )
        break
    }

    //----------------------------RETURN----------------------------------------
    return (
      <div>
        <div>
          <Paper className='MeetingHeader'> <h1> {MeetingHeader} </h1> </Paper>
        </div>
        {MeetingComponent}
      </div>
    )
  }
}
