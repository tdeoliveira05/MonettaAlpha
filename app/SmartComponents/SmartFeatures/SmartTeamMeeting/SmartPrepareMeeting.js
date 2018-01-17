import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'

import DumbPrepareMeeting from '../../../DumbComponents/TeamMeeting/DumbPrepareMeeting.js'

export default class SmartPrepareMeeting extends React.Component {
  constructor(props) {
    super(props)
    /*-------------------------------------------------------------------------
    NOTE: the following declaration uses a prop to initialize the state of this component.
    This is commonly though of as an anti-pattern (non efficient method of coding)
    primarily due to the fact that if the props value changes in the parent Component
    the child component (this) would not update since the prop constructor is only
    called when the prop first renders.

    React docs mentions the following exemption:
    "However, it’s not an anti-pattern if you make it clear that the prop is only
    seed data for the component’s internally-controlled state:"

    Because of this, the use of this prop is in fact NOT an anti-pattern. Please
    communicate any concerns or newfound inefficiencies with this method to the
    technical staff.


    ---------------------------------------------------------------------------
    */
    this.state = {
      title: this.props.meetingData.title,
      goals: this.props.meetingData.goals,
      members: this.props.meetingData.members,
      host: this.props.meetingData.host,
      tempMember: '',
      tempGoal: '',
      tempExpectedDuration: 15,
      errorText: {
        goalInput: '',
        memberInput: '',
        meetingTitle: ''
      },
      maxDuration: false
    }

    //General Function binds
    this.handleChange         = this.handleChange.bind(this)
    this.nextStep             = this.nextStep.bind(this)
    this.previousStep         = this.previousStep.bind(this)
    this.changeDuration       = this.changeDuration.bind(this)
    this.setDuration          = this.setDuration.bind(this)
    this.checkErrors          = this.checkErrors.bind(this)

    // GoalList Function binds
    this.removeGoalListItem   = this.removeGoalListItem.bind(this)
    this.changeGoalListItem   = this.changeGoalListItem.bind(this)
    this.addGoalListItem      = this.addGoalListItem.bind(this)

    //MemberList Function binds
    this.removeMemberListItem = this.removeMemberListItem.bind(this)
    this.changeTempMember     = this.changeTempMember.bind(this)
    this.addMemberListItem    = this.addMemberListItem.bind(this)
  }

  componentDidUpdate () {
    // Error Check
    var errorText = this.state.errorText
    // If title is not empty, make sure there is no title error text
    if (this.state.title !== '' && errorText.meetingTitle !== '') {
      errorText.meetingTitle = ''
      this.setState(errorText)
    }

    // if the goal list is not empty, make sure there is no goal error text
    if (this.state.goals.length !== 0 && errorText.goalInput !== '') {
      errorText.goalInput = ''
      this.setState(errorText)
    }

    // if the participant list is not empty, make sure there is no participant error text
    if (this.state.members.length !== 0 && errorText.memberInput !== '') {
      errorText.memberInput = ''
      this.setState(errorText)
      console.log('error member')
    }
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  nextStep () {
    if (!this.checkErrors()) {
      var dataObj     = this.props.getMeetingData()
      dataObj.title   = this.state.title
      dataObj.goals   = this.state.goals
      dataObj.date    = Date.now()
      dataObj.members = this.state.members
      this.props.submitMeetingData(dataObj)
      this.props.handleIndexChange('forward')
    } else {
      console.log('error found')
    }
  }

  previousStep () {
    this.props.handleIndexChange('backward')
  }

  checkErrors () {
    var errorText = this.state.errorText
    if (this.state.goals.length === 0) {
      errorText.goalInput = (<p> Your meeting should have at least one goal. Click the *Add a New Goal* button to prepare the meeting! </p>)
      this.setState(errorText)
      return true
      console.log('error 1')
    } else if (this.state.title === ''){
      errorText.meetingTitle = (<p> You forgot to add a title to the meeting at the top! </p>)
      this.setState(errorText)
      return true
      console.log('error 2')
    } else if (this.state.members.length === 0) {
      errorText.memberInput = (<p> You forgot to add participants to the meeting! </p>)
      this.setState(errorText)
      return true
      console.log('error 3')
    } else {
      return false
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
    tempGoalList.push(this.state.tempGoal)

    this.setState({goals: tempGoalList, tempGoal: '', errorText: {goalInput: ''}})
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
    var tempMemberList = this.state.members
    tempMemberList.splice(mapObj.index, 1)

    this.setState({members: tempMemberList, errorText: {goalInput: ''}})
  }

  // DURATION FUNCTIONS --------------------------------------------------------

  changeDuration (event, value) {
    if (value === 120) {
      this.setState({tempExpectedDuration: value, maxDuration: true})
    } else {
      this.setState({tempExpectedDuration: value, maxDuration: false})
    }
  }

  setDuration (durationVal) {
    if (durationVal === 120) {
      this.setState({tempExpectedDuration: durationVal, maxDuration: true})
    } else {
      this.setState({tempExpectedDuration: durationVal, maxDuration: false})
    }
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    //----------------------------RETURN----------------------------------------
    return(
      <DumbPrepareMeeting
        nextStep              = {this.nextStep}
        tempGoal              = {this.state.tempGoal}
        previousStep          = {this.previousStep}
        handleChange          = {this.handleChange}
        addMemberListItem     = {this.addMemberListItem}
        removeMemberListItem  = {this.removeMemberListItem}
        meetingTitle          = {this.state.title}
        goalError             = {this.state.errorText.goalInput}
        titleError            = {this.state.errorText.meetingTitle}
        memberError           = {this.state.errorText.memberInput}
        tempMember            = {this.state.tempMember}
        memberList            = {this.state.members}
        goalList              = {this.state.goals}
        changeGoalListItem    = {this.changeGoalListItem}
        removeGoalListItem    = {this.removeGoalListItem}
        addGoalListItem       = {this.addGoalListItem}
        tempExpectedDuration  = {this.state.tempExpectedDuration}
        changeDuration        = {this.changeDuration}
        maxDuration           = {this.state.maxDuration}
        setDuration           = {this.setDuration}
        />
    )
  }
}
