import React from 'react'

import DumbConductMeeting from '../../DumbComponents/TeamMeeting/DumbConductMeeting.js'

export default class SmartConductMeeting extends React.Component {
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

    In this case, the noteLists state key is storing the prop value passed to it when
    it rendered to allow the user to change.

    Because of this, the use of this prop is in fact NOT an anti-pattern. Please
    communicate any concerns or newfound inefficiencies with this method to the
    technical staff.
    ---------------------------------------------------------------------------

    this.props.meetingDate.notes = {general: [...], actionL: [...], decision: [...]}

    therefore:

    noteLists : {
        general: [...],
        action: [...],
        decision: [...]
      }

    ---------------------------------------------------------------------------
    */

    this.state = {
      tempItemText: '',
      tempItemType: 'general',
      tempItemColor: 'gray',
      selectedIndex: 0,
      notes: {
        general: [],
        action: [],
        decision: []
      },
      hasNotes: false,
      scrollToBottom: false,
      startDate: Date.now(),
      timeElapsed: {
        duration: 0,
        formattedDuration: '00:00'
      },
      errorText: { inputText: ''},
      typeList: [
        { text: 'General Note',
          type: 'general',
          activated: true,
          style: { // first value is for inactive, second is for active selection of that chip
            primaryColor: ['gray', 'white'], // color for borders and font
            secondaryColor: ['white', 'gray'] // color for chip background
          }
        },
        { text: 'Action Item',
          type: 'action',
          activated: false,
          style: { // first value is for inactive, second is for active selection of that chip
            primaryColor: ['rgb(255,172,77)', 'white'], // color for borders and font
            secondaryColor: ['white', 'rgb(255,172,77)'] // color for chip background
          }
        },
        { text: 'Team Decision',
          type: 'decision',
          activated: false,
          style: { // first value is for inactive, second is for active selection of that chip
            primaryColor: ['rgb(70,153,255)', 'white'], // color for borders and font
            secondaryColor: ['white', 'rgb(70,153,255)'] // color for chip background
          }
        }
      ]

    }

    this.handleChange         = this.handleChange.bind(this)
    this.submitTempItem       = this.submitTempItem.bind(this)
    this.handleTypeClick      = this.handleTypeClick.bind(this)
    this.deleteNoteItem       = this.deleteNoteItem.bind(this)
    this.nextStep             = this.nextStep.bind(this)
    this.previousStep         = this.previousStep.bind(this)
    this.getAndUpdateDuration = this.getAndUpdateDuration.bind(this)
    this.formatDuration       = this.formatDuration.bind(this)
    this.createList           = this.createList.bind(this)
    this.setRef               = this.setRef.bind(this)
  }

  componentDidMount () {
    this.interval = setInterval(this.getAndUpdateDuration, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  componentDidUpdate () {
    //if this.state.scrollToBottom === true then scroll to the bottom of notes list
    //and reset the state property, scroll to bottom of notes list
    if (this.state.scrollToBottom) {
      var targetBottomScrollElement = this.scrollRef
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
    var dataObj         = this.props.getMeetingData()
    dataObj.notes       = this.state.notes
    dataObj.timeElapsed = this.state.timeElapsed
    this.props.submitMeetingData(dataObj)
    this.props.handleIndexChange('forward')
  }

  previousStep () {
    this.props.handleIndexChange('backward')
  }

  getAndUpdateDuration () {
    var durationVal          = Date.now() - this.state.startDate
    var formattedDurationVal = this.formatDuration(durationVal)
    var timeElapsed          = {timeElapsed: {duration: durationVal, formattedDuration: formattedDurationVal}}

    this.setState(timeElapsed)
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

  deleteNoteItem (index) {
    var newNoteList = this.state.notes
    newNoteList.splice(index, 1)

    this.setState(newNoteList)
  }

  submitTempItem () {
    // using regular expressions to check if there was anything typed in the text field
    if (!this.state.tempItemText.match(/[a-z]/i)) {
      this.setState({errorText: {inputText: 'Please type a note into the text field above'}})
      return
    } else {
      this.setState({errorText: {inputText: ''}})
    }
    var itemType    = this.state.tempItemType
    var newNoteList = this.state.notes
    var newNoteItem = {
                      text: this.state.tempItemText,
                      type: this.state.tempItemType,
                      color: this.state.tempItemColor,
                      timeStamp: this.state.timeElapsed.duration,
                      formattedTimeStamp: this.state.timeElapsed.formattedDuration
                      }

    //submits the tempItem to the list and overwrites the state to update it
    newNoteList[itemType].push(newNoteItem)
    this.setState({tempItemText: '', notes: newNoteList, hasNotes: true, scrollToBottom: true})
  }

  handleTypeClick (index) {
    var tempTypeList = this.state.typeList

    // reset all activated booleans
    tempTypeList[0].activated = false
    tempTypeList[1].activated = false
    tempTypeList[2].activated = false

    // update activation
    tempTypeList[index].activated = true
    this.setState(tempTypeList)

    // update type
    var newItemType = {tempItemType: tempTypeList[index].type}
    this.setState(newItemType)

    // update color
    var newItemColor = {tempItemColor: tempTypeList[index].style.secondaryColor[1]}
    this.setState(newItemColor)
  }

  createList () {
    //This function will likely be stored in a separate file since it can be used many times
    var generalNotesList = this.state.notes.general
    var actionItemsList = this.state.notes.action
    var teamDecisionsList = this.state.notes.decision

    // Adding arrays together to form an unsorted array
    var list = []
    var list = list.concat(generalNotesList, actionItemsList, teamDecisionsList)

    //Selection Sorting algorithm
    var lengthVal = list.length
    var minIndex, temp
    for (var i = 0; i < lengthVal; i++) {
      minIndex = i
      for (var j = i + 1; j < lengthVal; j++) {
        if (list[j].timeStamp < list[minIndex].timeStamp) {
          minIndex = j
        }
      }

      temp = list[i]
      list[i] = list[minIndex]
      list[minIndex] = temp
    }

    return list

  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var noteList = []
    if (this.state.hasNotes) noteList = this.createList() // if there are notes, will create a sorted list
    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbConductMeeting
          noteList = {noteList}
          setRef = {this.setRef}
          goalList = {this.props.meetingData.goals}
          typeList = {this.state.typeList}
          selectedIndex = {this.state.selectedIndex}
          tempItemText = {this.state.tempItemText}
          tempItemType = {this.state.tempItemType}
          handleChange = {this.handleChange}
          submitTempItem = {this.submitTempItem}
          handleTypeClick = {this.handleTypeClick}
          deleteNoteItem = {this.deleteNoteItem}
          nextStep = {this.nextStep}
          previousStep = {this.previousStep}
          errorText = {this.state.errorText}
          formattedDuration = {this.state.timeElapsed.formattedDuration}
          />
      </div>
    )
  }
}
