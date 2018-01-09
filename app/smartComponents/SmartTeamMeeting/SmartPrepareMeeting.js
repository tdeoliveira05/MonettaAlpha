import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'

import DumbPrepareMeeting from '../../dumbComponents/TeamMeeting/DumbPrepareMeeting.js'

export default class SmartPrepareMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      goals: [],
      members: ['You', 'd'],
      host: '',
      errorText: ''
    }

    this.removeGoalListItem   = this.removeGoalListItem.bind(this)
    this.createGoalList       = this.createGoalList.bind(this)
    this.changeGoalListItem   = this.changeGoalListItem.bind(this)
    this.addGoalListItem      = this.addGoalListItem.bind(this)
    this.handleChange         = this.handleChange.bind(this)
    this.nextStep             = this.nextStep.bind(this)
    this.createMemberList     = this.createMemberList.bind(this)
    this.removeMemberListItem = this.removeMemberListItem.bind(this)
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  nextStep () {
    var goals = this.state.goals
    if (goals.length === 0 || goals[0] === '') {
      this.setState({errorText: 'Your meeting should have at least one goal. Click the *Add a New Goal* button to prepare the meeting!'})
    } else {
      var dataObj = this.props.getMeetingData()
      dataObj.title = this.state.title
      dataObj.goals = this.state.goals
      dataObj.date  = Date.now()
      this.props.submitMeetingData(dataObj)
      this.props.handleIndexChange('forward')
    }
  }

  createGoalList () {
    var listItems = this.state.goals
    var goalList = (
      <div>
        {listItems.map((item, index) => {
          return (
            <Paper key = {index} className = 'PrepareMeetingListItem'>
              <h2 style = {{padding: '4px'}}> {index + 1}. </h2>
              <TextField
                underlineShow = {false}
                value         = {listItems[index]}
                name          = {JSON.stringify(index)}
                onChange      = {this.changeGoalListItem}
                multiLine     = {true}
                rowsMax       = {3}
                />
              <button type = 'button' className = 'PrepareMeetingListItemButton' onClick={() => this.removeGoalListItem({index})}> X </button>
            </Paper>
          )
        })}
        <RaisedButton
          label = 'Add a new goal'
          style={{width:'100%'}}
          onClick={() => this.addGoalListItem()}
          />
      </div>
    )
    return goalList
  }

  removeGoalListItem (index, type) {
    var tempGoalList = this.state.goals
    tempGoalList.splice(mapObj.index, 1)
    this.setState({goals: tempGoalList})

  }

  changeGoalListItem (event) {
    var tempGoalList = this.state.goals
    tempGoalList[event.target.name] = event.target.value
    this.setState({goals: tempGoalList})
  }

  addGoalListItem () {
    var tempGoalList = this.state.goals
    tempGoalList.push('')
    this.setState({goals: tempGoalList})
  }

  createMemberList () {
    var listItems = this.state.members
    var memberList = (
      <div>
          {listItems.map((item, index) => {
            return (
              <Chip
                key             = {index}
                onRequestDelete = {this.removeMemberListItem}
                color           = {'rgb(102,153,255)'}
                >
                {item}
              </Chip>
            )
          })}
      </div>
    )
    return memberList
    console.log(memberList)
  }

  removeMemberListItem (mapObj) {
      var tempMemberList = this.state.members
      tempMemberList.splice(mapObj.index, 1)
      this.setState({members: tempMemberList})
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var goalList    = this.createGoalList()
    var memberList  = this.createMemberList()
    //----------------------------RETURN----------------------------------------
    return(
      <DumbPrepareMeeting
        nextStep      = {this.nextStep}
        handleChange  = {this.handleChange}
        meetingTitle  = {this.state.title}
        errorText     = {this.state.errorText}
        goalList      = {goalList}
        memberList    = {memberList}
        />
    )
  }
}
