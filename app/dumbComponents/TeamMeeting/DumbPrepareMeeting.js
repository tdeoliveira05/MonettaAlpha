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
  previousStep,
  addMemberListItem,
  removeMemberListItem,
  addGoalListItem,
  removeGoalListItem,
  changeGoalListItem,
  tempGoal,
  meetingTitle,
  listInput,
  tempMember,
  titleError,
  memberError,
  goalError,
  memberList,
  goalList,
  tempExpectedDuration,
  changeDuration,
  setDuration,
  maxDuration
}) => (
  <div className = 'PrepareMeetingWrapper'>
    <div className = 'PrepareMeetingContent'>
      <TextField
        underlineShow = {false}
        hintText      = 'Enter the Meeting Title'
        name          = 'title'
        value         = {meetingTitle}
        onChange      = {handleChange}
        hintStyle     = {{textAlign: 'center', fontSize: '1.5em'}}
        inputStyle    = {{textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold'}}
        style         = {{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '300px'}}
        />
      <Divider style = {{marginBottom: '30px', width: '100%'}}/>
      <div className = 'PrepareMeetingSetDuration'>
        <h2 style = {{marginTop: '10px', color: 'gray'}}> How long will this meeting be? </h2>
        <div className = 'PrepareMeetingDurationInfo'>
          <div>
            <h1 style = {{fontSize: '4em', margin: '0'}}> { maxDuration ? tempExpectedDuration + '+' : tempExpectedDuration } </h1>
            <h3 style = {{margin: '0'}}> minutes </h3>
          </div>
          <Slider
            onChange    = {changeDuration}
            value       = {tempExpectedDuration}
            min         = {0}
            max         = {120}
            step        = {5}
            axis        = 'y'
            sliderStyle = {{margin: '0', padding: '0'}}
          />
        </div>
        <div className = 'PrepareMeetingDurationButtons'>
          <FlatButton
            label = '15 mins'
            style = {{color: '#ffac4d'}}
            onClick = {() => setDuration(15)}
          />
          <FlatButton
            label = '30 mins'
            style = {{color: '#6699ff'}}
            onClick = {() => setDuration(30)}
          />
          <FlatButton
            label = '60 mins'
            style = {{color: 'gray'}}
            onClick = {() => setDuration(60)}
          />
          <FlatButton
            label = '120 mins'
            style = {{color: 'gray'}}
            onClick = {() => setDuration(120)}
          />
        </div>

      </div>


      <div className = 'PrepareMeetingDiv'>
        <div className = 'PrepareMeetingDivLeft'>
          <Paper className = 'PrepareMeetingPaperLeft'>
            <h2> Participants </h2>
            <div>
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
          </Paper>
          <div className = 'PrepareMeetingMemberList'>
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
        </div>
        <div className = 'PrepareMeetingDivRight'>
          <Paper className = 'PrepareMeetingPaperRight'>
            <h2> Meeting Goals </h2>
            <div>
              <TextField
                underlineShow = {false}
                hintText      = 'Add Meeting Goals'
                value         = {tempGoal}
                name          = 'tempGoal'
                onChange      = {handleChange}
                onKeyPress    = {(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addGoalListItem()
                  }
                }}
              />
              <RaisedButton
                label   = 'Add'
                onClick = {() => addGoalListItem()}
                secondary = {true}
              />
            </div>
          </Paper>

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
                  <button type = 'button' onClick = {() => removeGoalListItem({index})} className = 'PrepareMeetingGoalItemButton'>
                    X
                  </button>
                </Paper>
              )
            })}
          </div>
        </div>
      </div>
        {goalError}
        {memberError}
        {titleError}
      <div className = 'PrepareMeetingStepper'>
        <h2> Proceed? </h2>
        <div className = 'PrepareMeetingStepperButtons'>
          <FlatButton
            label     = 'Back'
            primary   = {true}
            onClick   = {() => previousStep()}
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
