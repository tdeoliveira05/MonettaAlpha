import React from 'react'

import DumbReviewMeeting from '../../../DumbComponents/TeamMeeting/DumbReviewMeeting.js'

export default class SmartReviewMinutes extends React.Component {
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
    */

    this.state = {
      noteLists: this.props.meetingData.notes
    }

    this.handleNoteItemChange    = this.handleNoteItemChange.bind(this)
    this.finishMeeting           = this.finishMeeting.bind(this)
    this.previousStep            = this.previousStep.bind(this)
    this.updateParentMeetingData = this.updateParentMeetingData.bind(this)
  }

  finishMeeting () {
    this.updateParentMeetingData()
    this.props.handleIndexChange('finished')
  }

  previousStep () {
    this.updateParentMeetingData()
    this.props.handleIndexChange('backward')
  }

  updateParentMeetingData () {
    var dataObj   = this.props.getMeetingData()
    dataObj.notes = this.state.noteLists

    this.props.submitMeetingData(dataObj)
  }

  handleNoteItemChange (event) {
    //Preparing for information extraction
    var targetString = event.target.name //designating variable containing TextField information
    var indexToSplit = targetString.indexOf('[') //designating a flag to split in relation to

    // information extraction
    var targetName   = targetString.substr(0, indexToSplit) // extracting type of note item
    var targetIndex  = targetString.substr(indexToSplit + 1, 1) // extracting index of target note item

    //immutability helpers
    var newNoteLists = this.state.noteLists

    newNoteLists[targetName][targetIndex].text = event.target.value
    this.setState(newNoteLists)
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var generalNotesList = []
    if (this.state.noteLists.general) generalNotesList = this.state.noteLists.general

    var actionItemsList = []
    if (this.state.noteLists.action) actionItemsList = this.state.noteLists.action

    var teamDecisionsList = []
    if (this.state.noteLists.decision) teamDecisionsList = this.state.noteLists.decision
    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbReviewMeeting
          handleIndexChange    = {this.props.handleIndexChange}
          meetingData          = {this.props.meetingData}
          generalNotesList     = {generalNotesList}
          actionItemsList      = {actionItemsList}
          teamDecisionsList    = {teamDecisionsList}
          handleNoteItemChange = {this.handleNoteItemChange}
          finishMeeting        = {this.finishMeeting}
          previousStep         = {this.previousStep}
          typeList             = {this.props.typeList}
          />
      </div>
    )
  }
}
