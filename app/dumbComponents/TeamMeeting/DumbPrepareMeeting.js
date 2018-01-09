import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const DumbPrepareMeeting = ({handleChange, nextStep, meetingTitle, listInput, goalList, memberList, errorText}) => (
  <div className = 'PrepareMeetingWrapper'>
    <div className = 'PrepareMeetingContent'>
      <Paper className = 'PrepareMeetingPaper'>

        <TextField
          underlineShow = {false}
          hintText = 'Enter the Meeting Title'
          name = 'title'
          value = {meetingTitle}
          onChange = {handleChange}
          />
        <Divider/>

        {memberList}
        <Divider/>

        <p style={{marginTop: '30px'}}> What are your goals for this meeting? </p>

        {goalList}

      </Paper>
      <h2 style={{color: 'red', fontWeight: 'bold'}}> {errorText} </h2>
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
            onClick = {() => nextStep()}
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
