import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import DumbPrepareMeeting from '../dumbComponents/TeamMeeting/DumbPrepareMeeting.js'
import DumbConductMeeting from '../dumbComponents/TeamMeeting/DumbConductMeeting.js'
import DumbReviewMinutes from '../dumbComponents/TeamMeeting/DumbReviewMinutes.js'

export default class SmartTeamMeeting extends React.Component {
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
    this.removeGoalListItem       = this.removeGoalListItem.bind(this)
    this.createGoalList           = this.createGoalList.bind(this)
    this.changeGoalListItem       = this.changeGoalListItem.bind(this)
    this.addGoaListItem           = this.addGoaListItem.bind(this)
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

    console.log(this.state.meetingData)
  }

  handleFinishedMeeting () {
    console.log('Submitting: ' + this.state.meetingData)
  }

  createGoalList () {
    var listItems = this.state.meetingData.goals
    var goalList = (<div>

        {listItems.map((item, index) => {
          return (
          <Paper key = {index} className = 'PrepareMeetingListItem'>
            <h2 style={{padding: '4px'}}> {index + 1}. </h2>
            <TextField
              underlineShow = {false}
              value = {listItems[index]}
              name = {JSON.stringify(index)}
              onChange = {this.changeGoalListItem}
              />
            <button type = 'button' className = 'PrepareMeetingListItemButton' onClick={() => this.removeGoalListItem({index})}> X </button>
          </Paper>
          )
        })}
        <RaisedButton
          label = 'Add a new goal'
          style={{width:'100%'}}
          onClick={() => this.addGoaListItem()}
          />
      </div>)
      return goalList
  }

  removeGoalListItem (mapObj) {
    var tempNewGoalList = this.state.meetingData.goals
    tempNewGoalList.splice(mapObj.index, 1)
    this.setState({meetingData: {goals: tempNewGoalList}})

  }

  changeGoalListItem (event) {
    var newTempDataObj = this.state.meetingData
    newTempDataObj.goals[event.target.name] = event.target.value
    this.setState(newTempDataObj)

  }

  addGoaListItem () {
    var newTempDataObj = this.state.meetingData
    newTempDataObj.goals.push('')
    this.setState(newTempDataObj)

    console.log(this.state.meetingData.goals)
  }

  render () {
    //---------------------------VARIABLE CREATION------------------------------
    // consider making this its own separate smart component (notice qty of code lines)
    // also this is pretty hack...
    var goalList = this.createGoalList()

    //---------------------------CONDITIONS-------------------------------------

    switch (this.state.meetingIndex) {
      case 0:
        var MeetingHeader     = 'Prepare the Meeting'
        var MeetingComponent  = (
          <DumbPrepareMeeting
            handleIndexChange       = {this.handleIndexChange}
            handleChangeMeetingData = {this.handleChangeMeetingData}
            meetingTitle            = {this.state.meetingData.title}
            goalList                = {goalList}
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
