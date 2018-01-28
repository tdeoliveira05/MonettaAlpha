import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbReviewStandard from '../../../DumbComponents/Main/StandardMeeting/DumbReviewStandard.js'

class SmartReviewStandard extends React.Component {
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

    In this case, the notes state key is storing the prop value passed to it when
    it rendered to allow the user to change.

    Because of this, the use of this prop is in fact NOT an anti-pattern. Please
    communicate any concerns or newfound inefficiencies with this method to the
    technical staff.
    ---------------------------------------------------------------------------
    */

    this.state = {
      notes: this.props.meetingData.notes
    }

    this.handleNoteItemChange    = this.handleNoteItemChange.bind(this)
    this.finishMeeting           = this.finishMeeting.bind(this)
    this.previousStep            = this.previousStep.bind(this)
    this.updateParentMeetingData = this.updateParentMeetingData.bind(this)
    this.handleNoteItemDelete    = this.handleNoteItemDelete.bind(this)
  }

  finishMeeting () {
    console.log('finished meeting')
    this.updateParentMeetingData()
    this.props.handleIndexChange('finished')
  }

  previousStep () {
    this.updateParentMeetingData()
    this.props.handleIndexChange('backward')
  }

  updateParentMeetingData () {
    var dataObj   = this.props.getMeetingData()
    dataObj.notes = this.state.notes

    this.props.submitMeetingData(dataObj)
  }

  handleNoteItemChange (event, index) {
    var newNoteList = this.state.notes
    newNoteList[index].text = event.target.value
    this.setState({notes: newNoteList})
  }

  handleNoteItemDelete (targetIndex) {
    console.log(targetIndex)
    var newNoteList = this.state.notes
    newNoteList.splice(targetIndex, 1)
    this.setState({notes: newNoteList})
  }


  render () {
    //---------------------------CONDITIONS-------------------------------------
    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbReviewStandard
          noteList             = {this.state.notes}
          handleNoteItemChange = {this.handleNoteItemChange}
          handleNoteItemDelete = {this.handleNoteItemDelete}
          finishMeeting        = {this.finishMeeting}
          previousStep         = {this.previousStep}
          categoryList         = {this.props.categoryList}
          meetingData          = {this.props.meetingData}
          />
      </div>
    )
  }
}

export default withRouter(SmartReviewStandard)
