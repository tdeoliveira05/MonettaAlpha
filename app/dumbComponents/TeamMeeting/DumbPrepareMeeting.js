import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const DumbPrepareMeeting = ({handleChangeMeetingData, handleIndexChange, meetingTitle, listInput, goalList}) => (
  <div className = 'PrepareMeetingWrapper'>
    <div className = 'PrepareMeetingContent'>
      <Paper className = 'PrepareMeetingPaper'>

        <TextField
          underlineShow = {false}
          hintText = 'Enter the Meeting Title'
          name = 'title'
          value = {meetingTitle}
          onChange = {handleChangeMeetingData}
          />
        <Divider/>
        <p style={{marginTop: '30px'}}> What are your goals for this meeting? </p>

        {goalList}

      </Paper>
      <div className = 'PrepareMeetingStepper'>
        <h2> Proceed? </h2>
        <div className = 'PrepareMeetingStepperButtons'>
          <FlatButton
            label = 'Back'
            disabled = {false}
            primary = {true}
            />
          <RaisedButton
            label = 'Next'
            secondary = {true}
            onClick = {() => handleIndexChange('forward')}
            />
      </div>
    </div>

    </div>
  </div>
)

export default DumbPrepareMeeting

/*
<Paper className = 'PrepareMeetingListInput' zDepth={3}>

  <div className = 'PrepareMeetingListItem'>
    <h2> 1. </h2>
    <div className = 'PrepareMeetingListInputText'>
      <TextField
        underlineShow = {false}
        name = 'listInput'
        value = {listInput}
        onChange = {handleChangeTempData}
        />
    </div>
    <button type = 'button'> delete </button>
  </div>

</Paper>


<RaisedButton
  label='Add another goal'
  />
*/
