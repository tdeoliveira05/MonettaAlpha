import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Slider from 'material-ui/Slider'

const DumbPrepareMeeting = ({
  handleChange,
  nextStep,
  addMemberListItem,
  removeMemberListItem,
  addGoalListItem,
  removeGoalListItem,
  changeGoalListItem,
  meetingTitle,
  listInput,
  tempMember,
  errorText,
  memberList,
  goalList,
  tempExpectedDuration,
  changeDuration,
  maxDuration
}) => (
  <div className = 'PrepareMeetingWrapper'>
    <div className = 'PrepareMeetingContent'>
      <Paper className = 'PrepareMeetingPaper'>

        <TextField
          underlineShow = {false}
          hintText      = 'Enter the Meeting Title'
          name          = 'title'
          value         = {meetingTitle}
          onChange      = {handleChange}
          hintStyle     = {{textAlign: 'center'}}
          inputStyle    = {{textAlign: 'center'}}
          style         = {{display: 'flex', justifyContent: 'center'}}
          />
        <Divider style = {{width: '100%'}}/>

        <div className = 'PrepareMeetingMemberList'>
          <div className = 'PrepareMeetingMemberInput'>
            <TextField
              underlineShow = {false}
              hintText      = 'Add Participants'
              value         = {tempMember}
              name          = 'tempMember'
              onChange      = {handleChange}
              onKeyPress    = {(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addMemberListItem()
                }
              }}
              />
            <RaisedButton
              label   = 'Add'
              onClick = {() => addMemberListItem()}
              primary = {true}
              />
          </div>
          <Divider style = {{width: '100%'}}/>
          {memberList.map((item, index) => {
            return (
              <Paper key = {index} className = 'PrepareMeetingMemberItem' >
                <h3> {item} </h3>
                <button
                  type      = 'button'
                  onClick   = {() => removeMemberListItem({index})}
                  className = 'PrepareMeetingMemberItemButton'
                  > X </button>
              </Paper>
            )
          })}
        </div>
        <Divider />
        <div className = 'PrepareMeetingSetDuration'>
          <div>
            <h2 style={{marginTop: '10px'}}> How long will this meeting be? </h2>
            <h1 style = {{fontSize: '4em', margin: '0'}}> { maxDuration ? tempExpectedDuration + '+' : tempExpectedDuration } </h1>
            <h3 style = {{margin: '0px 0px 10px 0px'}}> minutes </h3>
          </div>
          <div>
            <Slider
              onChange = {changeDuration}
              value    = {tempExpectedDuration}
              min      = {0}
              max      = {120}
              step     = {5}
              sliderStyle    = {{margin: '0', padding: '0'}}
            />
          </div>
        </div>
        <h2 style={{marginTop: '30px'}}> What are your goals for this meeting? </h2>
        <div className = 'PrepareMeetingGoalList'>
          {goalList.map((item, index) => {
            return (
              <Paper key = {index} className = 'PrepareMeetingGoalItem'>
                <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <h2 style = {{padding: '4px'}}> {index + 1}. </h2>
                  <TextField
                    underlineShow = {false}
                    value         = {goalList[index]}
                    name          = {JSON.stringify(index)}
                    onChange      = {changeGoalListItem}
                    multiLine     = {true}
                    rowsMax       = {3}
                  />
                </div>
                <button
                  type      = 'button'
                  onClick   = {() => removeGoalListItem({index})}
                  className = 'PrepareMeetingGoalItemButton'
                  > X </button>
              </Paper>
            )
          })}
          <RaisedButton
            label   = 'Add a new goal'
            style   = {{width:'100%'}}
            onClick = {() => addGoalListItem()}
            primary = {true}
            />
        </div>

      </Paper>
      <h2 style={{color: 'red', fontWeight: 'bold'}}> {errorText} </h2>
      <div className = 'PrepareMeetingStepper'>
        <h2> Proceed? </h2>
        <div className = 'PrepareMeetingStepperButtons'>
          <FlatButton
            label     = 'Back'
            disabled  = {true}
            primary   = {true}
            />
          <RaisedButton
            label     = 'Next'
            secondary = {true}
            onClick   = {() => nextStep()}
            />
      </div>
    </div>

    </div>
  </div>
)

export default DumbPrepareMeeting
