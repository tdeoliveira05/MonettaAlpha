import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'

import DumbPrepareMeeting from '../../DumbComponents/TeamMeeting/DumbPrepareMeeting.js'

export default class SmartPrepareMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      goals: [],
      members: ['Thiago De Oliveira', 'Donald Duck', 'Paul Lafont'],
      tempMember: '',
      host: '',
      errorText: ''
    }

    //General Function binds
    this.handleChange         = this.handleChange.bind(this)
    this.nextStep             = this.nextStep.bind(this)

    // GoalList Function binds
    this.removeGoalListItem   = this.removeGoalListItem.bind(this)
    this.changeGoalListItem   = this.changeGoalListItem.bind(this)
    this.addGoalListItem      = this.addGoalListItem.bind(this)

    //MemberList Function binds
    this.removeMemberListItem = this.removeMemberListItem.bind(this)
    this.changeTempMember     = this.changeTempMember.bind(this)
    this.addMemberListItem    = this.addMemberListItem.bind(this)
  }

  handleChange (event) {
    console.log( event.target.name + ' -> ' + event.target.value)
    this.setState({[event.target.name]: event.target.value})
  }

  nextStep () {
    var goals = this.state.goals
    if (goals.length === 0) {
      this.setState({errorText: 'Your meeting should have at least one goal. Click the *Add a New Goal* button to prepare the meeting!'})
    } else if (goals.includes('')) {
      this.setState({errorText: 'There seems to be an empty goal in your goal list, please fill it out to proceed!'})
    } else {
      var dataObj     = this.props.getMeetingData()
      dataObj.title   = this.state.title
      dataObj.goals   = this.state.goals
      dataObj.date    = Date.now()
      dataObj.members = this.state.members
      this.props.submitMeetingData(dataObj)
      this.props.handleIndexChange('forward')
    }
  }

  // GOAL LIST FUNCTIONS -------------------------------------------------------


  removeGoalListItem (mapObj) {
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


  // MEMBER LIST FUNCTIONS -----------------------------------------------------

  changeTempMember (val) {
    this.setState({tempMember: val})
  }

  addMemberListItem () {
    var memberList = this.state.members
    memberList.push(this.state.tempMember)

    this.setState({members: memberList, tempMember: ''})
  }

  removeMemberListItem (mapObj) {
    console.log(mapObj)
      var tempMemberList = this.state.members
      tempMemberList.splice(mapObj.index, 1)

      this.setState({members: tempMemberList})
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    //----------------------------RETURN----------------------------------------
    return(
      <DumbPrepareMeeting
        nextStep              = {this.nextStep}
        handleChange          = {this.handleChange}
        addMemberListItem     = {this.addMemberListItem}
        removeMemberListItem  = {this.removeMemberListItem}
        meetingTitle          = {this.state.title}
        errorText             = {this.state.errorText}
        tempMember            = {this.state.tempMember}
        memberList            = {this.state.members}
        goalList              = {this.state.goals}
        changeGoalListItem    = {this.changeGoalListItem}
        removeGoalListItem    = {this.removeGoalListItem}
        addGoalListItem       = {this.addGoalListItem}
        />
    )
  }
}
