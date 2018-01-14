import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const DumbPrepareMeeting = ({handleChange, nextStep, addMemberListItem, removeMemberListItem, addGoalListItem, removeGoalListItem, changeGoalListItem, meetingTitle, listInput, tempMember, memberList, goalList, errorText}) => (
  <div className = 'PrepareMeetingWrapper'>
    <div className = 'PrepareMeetingContent'>
      <Paper className = 'PrepareMeetingPaper'>

        <TextField
          underlineShow = {false}
          hintText = 'Enter the Meeting Title'
          name = 'title'
          value = {meetingTitle}
          onChange = {handleChange}
          hintStyle = {{textAlign: 'center'}}
          inputStyle = {{textAlign: 'center'}}
          style = {{display: 'flex', justifyContent: 'center'}}
          />
        <Divider/>

        <div className = 'PrepareMeetingMemberList'>
          <div className = 'PrepareMeetingMemberInput'>
            <TextField
              underlineShow = {false}
              hintText = 'Enter Participants'
              value = {tempMember}
              name = 'tempMember'
              onChange = {handleChange}
              onKeyPress = {(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addMemberListItem()
                }
              }}
              />
            <RaisedButton
              label = 'Add'
              onClick = {() => addMemberListItem()}
              primary = {true}
              />
            <Divider />
          </div>
            {memberList.map((item, index) => {
              return (
                <Paper key = {index} className = 'PrepareMeetingMemberItem' >
                  <h3> {item} </h3>
                  <button
                    type = 'button'
                    onClick={() => removeMemberListItem({index})}
                    className = 'PrepareMeetingMemberItemButton'
                    > X </button>
                </Paper>
              )
            })}
        </div>
        <Divider/>

        <h2 style={{marginTop: '30px'}}> What are your goals for this meeting? </h2>

        <div>
          {goalList.map((item, index) => {
            return (
              <Paper key = {index} className = 'PrepareMeetingGoalItem'>
                <h2 style = {{padding: '4px'}}> {index + 1}. </h2>
                <TextField
                  underlineShow = {false}
                  value         = {goalList[index]}
                  name          = {JSON.stringify(index)}
                  onChange      = {changeGoalListItem}
                  multiLine     = {true}
                  rowsMax       = {3}
                  />
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
            label = 'Back'
            disabled = {true}
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
