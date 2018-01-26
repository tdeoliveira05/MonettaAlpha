import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbConductMeeting from '../../../DumbComponents/Main/TeamMeeting/DumbConductMeeting.js'

class SmartConductMeeting extends React.Component {
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
      notes: this.props.meetingData.notes,
      timeElapsed: this.props.meetingData.meetingStats.timeElapsed,
      goals: this.props.meetingData.goals,
      tempItemText: '',
      tempItemCategory: 'general',
      tempItemColor: 'gray',
      selectedIndex: 0,
      hasNotes: false,
      updateTime: true,
      scrollToBottom: false,
      startDate: Date.now(),
      errorText: { inputText: ''}
    }

    this.handleChange           = this.handleChange.bind(this)
    this.submitTempItem         = this.submitTempItem.bind(this)
    this.handleTypeClick        = this.handleTypeClick.bind(this)
    this.deleteNoteItem         = this.deleteNoteItem.bind(this)
    this.nextStep               = this.nextStep.bind(this)
    this.previousStep           = this.previousStep.bind(this)
    this.getAndUpdateDuration   = this.getAndUpdateDuration.bind(this)
    this.formatDuration         = this.formatDuration.bind(this)
    this.setRef                 = this.setRef.bind(this)
    this.updateMeetingData      = this.updateMeetingData.bind(this)
    this.changeItemType         = this.changeItemType.bind(this)
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.interval = setInterval(this.getAndUpdateDuration, 1000)
    if (this.props.meetingData.notes.length > 0) this.setState({hasNotes: true})
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  componentDidUpdate () {
    //if this.state.scrollToBottom === true then scroll to the bottom of notes list
    //and reset the state property, scroll to bottom of notes list

    if (this.state.scrollToBottom) {
      var targetBottomScrollElement       = this.scrollRef
      targetBottomScrollElement.scrollTop = targetBottomScrollElement.scrollHeight
      this.setState({scrollToBottom: false})
    }

  }

  setRef (ref) {
    //this function grabs the ref property of the notes list to force the component
    //to scroll to the bottom when it is updated
    this.scrollRef = ref
  }

  nextStep () {
    this.updateMeetingData()
    this.props.handleIndexChange('forward')
  }

  previousStep () {
    this.updateMeetingData()
    this.props.handleIndexChange('backward')
  }

  updateMeetingData () {
    var dataObj                       = this.props.getMeetingData()
    dataObj.notes                     = this.state.notes
    dataObj.meetingStats.timeElapsed  = this.state.timeElapsed
    this.props.submitMeetingData(dataObj)
  }

  getAndUpdateDuration () {

    if (this.props.meetingData.meetingStats.timeElapsed.actualDuration > 0 && this.state.updateTime === true) {
      var durationVal = this.props.meetingData.meetingStats.timeElapsed.actualDuration + Date.now() - this.state.startDate //props added to carry on from when they left the conduct meeting tab
      this.setState({updateTime: false})
    } else {
      var durationVal = Date.now() - this.state.startDate
    }

    var formattedActualDurationVal    = this.formatDuration(durationVal)
    var timeElapsedObj                = this.state.timeElapsed

    timeElapsedObj.actualDuration            = durationVal
    timeElapsedObj.formattedActualDuration   = formattedActualDurationVal

    this.setState(timeElapsedObj)
  }

  formatDuration (durationVal) {
    var minutesVal           = ('0' + Math.floor(durationVal / 60000)).slice(-2)
    var secondsVal           = ('0' + Math.floor(((durationVal/60000) - minutesVal)*60)).slice(-2)
    var formattedDurationVal = minutesVal + ':' + secondsVal
    return formattedDurationVal
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  deleteNoteItem (targetIndex) {
    var newNoteList = this.state.notes
    newNoteList.splice(targetIndex, 1)
    this.setState({notes: newNoteList})
  }

  submitTempItem () {
    // using regular expressions to check if there was anything typed in the text field
    if (!this.state.tempItemText.match(/[a-z]/i)) {
      this.setState({errorText: {inputText: 'Please type a note into the text field above'}})
      return
    } else {
      this.setState({errorText: {inputText: ''}})
    }


    var newNoteList     = this.state.notes
    var newNoteItem     = {
                          text: this.state.tempItemText,
                          category: this.state.tempItemCategory,
                          timeStamp: this.state.timeElapsed.actualDuration,
                          formattedTimeStamp: this.state.timeElapsed.formattedActualDuration,
                          meta: {}
                          }

    //submits the tempItem to the list and overwrites the state to update it
    newNoteList.push(newNoteItem)
    this.setState({tempItemText: '', notes: newNoteList, hasNotes: true, scrollToBottom: true})
  }

  handleTypeClick (targetCategory) {
    var tempCategoryList = this.props.categoryList
    var newItemColor = tempCategoryList[targetCategory].color
    var newItemText  = tempCategoryList[targetCategory].text

    this.setState({tempItemColor: newItemColor, tempItemCategory: targetCategory})
  }

  createGoalList () {
    var tempGoalList = this.state.goals
    var goalList = []

    tempGoalList.map((goalItem) => {
      goalList.push(goalItem.text)
    })
    return goalList
  }

  changeItemType (event, key, value, index, noteItem) {
    console.log(value)
    console.log(noteItem)

    var newNoteList = this.state.notes
    newNoteList[index].category = value
    this.setState({notes: newNoteList})
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var goalList = this.createGoalList()

    var meetingInfoHeading = (
      <div style = {{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0', padding: '0'}}>
        <p style = {{color: 'gray', margin: '0', padding: '0'}}> {localStorage.fullName + this.props.meetingData.participants.map((participantsItem) => (', '+ participantsItem.fullName))} </p>
        <p style = {{color: 'gray', margin: '0', padding: '0'}}> {this.props.meetingData.location} </p>
      </div>
    )


    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbConductMeeting
          noteList               = {this.state.notes}
          meetingInfoHeading     = {meetingInfoHeading}
          setRef                 = {this.setRef}
          goalList               = {goalList}
          categoryList           = {this.props.categoryList} /**************************************NEEDS FIX*****/
          selectedIndex          = {this.state.selectedIndex}
          tempItemText           = {this.state.tempItemText}
          tempItemCategory       = {this.state.tempItemCategory}
          tempitemColor          = {this.state.tempItemColor}
          handleChange           = {this.handleChange}
          submitTempItem         = {this.submitTempItem}
          handleTypeClick        = {this.handleTypeClick}  /**************************************NEEDS FIX*****/
          deleteNoteItem         = {this.deleteNoteItem}
          nextStep               = {this.nextStep}
          previousStep           = {this.previousStep}
          errorText              = {this.state.errorText}
          formattedDuration      = {this.state.timeElapsed.formattedActualDuration}
          changeItemType         = {this.changeItemType}
          meetingData            = {this.props.meetingData}
          />
      </div>
    )
  }
}

export default withRouter(SmartConductMeeting)
