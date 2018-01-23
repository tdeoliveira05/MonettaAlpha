import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'

import DumbPrepareMeeting from '../../../DumbComponents/Main/TeamMeeting/DumbPrepareMeeting.js'

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
      participants: this.props.meetingData.participants,
      location: this.props.meetingData.location,
      tempParticipant: '',
      tempGoal: '',
      tempExpectedDuration: 15,
      errorText: {
        goalInput: '',
        participantInput: '',
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

    // Participants Function binds
    this.removeParticipantListItem = this.removeParticipantListItem.bind(this)
    this.addParticipantListItem    = this.addParticipantListItem.bind(this)
    this.createParticipantList     = this.createParticipantList.bind(this)
    this.changeParticipantListItem = this.changeParticipantListItem.bind(this)
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
    if (this.state.participants.length !== 0 && errorText.participantInput !== '') {
      errorText.participantInput = ''
      this.setState(errorText)
    }
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  nextStep () {
    if (!this.checkErrors()) {
      var dataObj          = this.props.getMeetingData()
      dataObj.title        = this.state.title
      dataObj.goals        = this.state.goals
      dataObj.date         = new Date
      dataObj.participants = this.state.participants
      dataObj.location     = this.state.location

      dataObj.meetingStats.timeElapsed.expectedDuration          = this.state.tempExpectedDuration*60000 // converting minutes to milliseconds
      dataObj.meetingStats.timeElapsed.formattedExpectedDuration = this.state.tempExpectedDuration + ' mins'


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
    // maybe we dont have errors and let the user do what they want and simply observe their behaviour
    var errorText = this.state.errorText

    if (this.state.goals.length === 0) {
      //errorText.goalInput = (<p> Your meeting should have at least one goal. Click the *Add a New Goal* button to prepare the meeting! </p>)
      //this.setState(errorText)
      //return true
      return false
    } else if (this.state.title === ''){
      //errorText.meetingTitle = (<p> You forgot to add a title to the meeting at the top! </p>)
      //this.setState(errorText)
      //return true
      return false
    } else if (this.state.participants.length === 0) {
      //errorText.participantInput = (<p> You forgot to add participants to the meeting! </p>)
      //this.setState(errorText)
      //return true
      return false
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
    var tempGoalList                     = this.state.goals
    tempGoalList[event.target.name].text = event.target.value

    this.setState({goals: tempGoalList})
  }

  addGoalListItem () {
    var tempGoalList = this.state.goals
    tempGoalList.push({
      text: this.state.tempGoal,
      completed: false,
      completionTimeStamp: 0,
      meta: {}
    })

    this.setState({goals: tempGoalList, tempGoal: '', errorText: {goalInput: ''}})
  }


  // PARTICIPANT LIST FUNCTIONS ----------------------------------------------

  addParticipantListItem () {
    var participantList     = this.state.participants
    var tempParticipantObj  = {fullName: this.state.tempParticipant, email: '', guest: true}
    participantList.push(tempParticipantObj)

    this.setState({participants: participantList, tempParticipant: ''})
  }

  removeParticipantListItem (mapObj) {
    var participantList = this.state.participants
    participantList.splice(mapObj.index -1, 1)

    this.setState({participants: participantList, errorText: {goalInput: ''}})
  }

  createParticipantList () {
    var participantsList    = [localStorage.fullName]
    var currentParticipants = this.state.participants

    currentParticipants.map((item) => {
      var participantName = item.fullName
      participantsList.push(participantName)
    })
    return participantsList
  }


  changeParticipantListItem (event) {
    if (event.target.name === '0') {
      console.log('cannot change host name at this page')
    } else {
      var index = event.target.name - 1
      var newParticipants = this.state.participants

      var targetParticipantObj = newParticipants[index]
      targetParticipantObj.fullName = event.target.value
      newParticipants[index] = targetParticipantObj

      this.setState(newParticipants)
    }

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
    var participantsList = this.createParticipantList()


    //----------------------------RETURN----------------------------------------
    return(
      <div style = {{height: '100%'}}>
        <DumbPrepareMeeting
          nextStep                    = {this.nextStep}
          tempGoal                    = {this.state.tempGoal}
          previousStep                = {this.previousStep}
          handleChange                = {this.handleChange}
          addParticipantListItem      = {this.addParticipantListItem}
          removeParticipantListItem   = {this.removeParticipantListItem}
          tempParticipant             = {this.state.tempParticipant}
          participantsList            = {participantsList}
          changeParticipantListItem   = {this.changeParticipantListItem}
          meetingTitle                = {this.state.title}
          meetingLocation             = {this.state.location}
          goalError                   = {this.state.errorText.goalInput}
          titleError                  = {this.state.errorText.meetingTitle}
          participantError            = {this.state.errorText.participantInput}
          goalList                    = {this.state.goals}
          changeGoalListItem          = {this.changeGoalListItem}
          removeGoalListItem          = {this.removeGoalListItem}
          addGoalListItem             = {this.addGoalListItem}
          tempExpectedDuration        = {this.state.tempExpectedDuration}
          changeDuration              = {this.changeDuration}
          maxDuration                 = {this.state.maxDuration}
          setDuration                 = {this.setDuration}
          meetingData                 = {this.props.meetingData}
          />
      </div>
    )
  }
}
