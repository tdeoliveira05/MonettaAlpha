import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Slider from 'material-ui/Slider'

const DumbPrepareMeeting = ({
  handleChange,
  changeParticipantListItem,
  nextStep,
  previousStep,
  addParticipantListItem,
  removeParticipantListItem,
  addGoalListItem,
  removeGoalListItem,
  changeGoalListItem,
  tempGoal,
  meetingTitle,
  listInput,
  tempParticipant,
  titleError,
  participantError,
  goalError,
  participantsList,
  goalList,
  tempExpectedDuration,
  changeDuration,
  meetingLocation,
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
        hintStyle     = {{textAlign: 'center', fontSize: '1.7em'}}
        inputStyle    = {{textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold'}}
        style         = {{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '300px'}}
        />
      <Divider style = {{width: '100%'}}/>
      <TextField
        underlineShow = {false}
        hintText      = 'Enter a location'
        name          = 'location'
        value         = {meetingLocation}
        onChange      = {handleChange}
        hintStyle     = {{textAlign: 'center'}}
        inputStyle    = {{textAlign: 'center'}}
        style         = {{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '300px'}}
        />
      <Divider style = {{width: '25%', marginBottom: '40px'}}/>

      <div className = 'PrepareMeetingDurationDiv'>
        <h2 style = {{marginTop: '10px', color: 'gray'}}> How long will this meeting be? </h2>
        <div className = 'PrepareMeetingSetDuration'>
          <div className = 'PrepareMeetingDurationInfo'>
            <h1 style = {{fontSize: '4em', margin: '0'}}> { maxDuration ? tempExpectedDuration + '+' : tempExpectedDuration } </h1>
            <h3 style = {{margin: '0'}}> minutes </h3>
          </div>
          <div className = 'PrepareMeetingDurationButtons'>
            <Slider
              onChange    = {changeDuration}
              value       = {tempExpectedDuration}
              min         = {0}
              max         = {120}
              step        = {5}
              axis        = 'y'
              sliderStyle = {{margin: '0', padding: '0'}}
            />
            <div>
              <button
                className = 'PrepareMeetingDurationButtonItems'
                style = {{color: '#ffac4d'}}
                onClick = {() => setDuration(15)}
              > 15 min </button>
              <button
                className = 'PrepareMeetingDurationButtonItems'
                style = {{color: '#6699ff'}}
                onClick = {() => setDuration(30)}
              > 30 min </button>
            </div>
            <div>
            <button
              className = 'PrepareMeetingDurationButtonItems'
              style = {{color: 'gray'}}
              onClick = {() => setDuration(60)}
            > 60 min </button>
            <button
              className = 'PrepareMeetingDurationButtonItems'
              style = {{color: 'gray'}}
              onClick = {() => setDuration(120)}
            > 120 min </button>
            </div>
          </div>
        </div>
      </div>


      <div className = 'PrepareMeetingInfo'>
        <div className = 'PrepareMeetingInfoDiv'>
          <Paper className = 'PrepareMeetingInfoPaper'>
            <h2> Participants </h2>
            <div className = 'PrepareMeetingInfoPaperItems'>
              <TextField
                underlineShow = {false}
                hintText      = 'Add Participants'
                value         = {tempParticipant}
                name          = 'tempParticipant'
                onChange      = {handleChange}
                onKeyPress    = {(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addParticipantListItem()
                  }
                }}
              />
              <div>
                <RaisedButton
                  label   = 'Add'
                  onClick = {() => addParticipantListItem()}
                  primary = {true}
                  style = {{margin: '0', padding: '0'}}
                />
              </div>
            </div>
          </Paper>
          <div className = 'PrepareMeetingDivList'>
            {participantsList.map((item, index) => {
              var button
              if (index === 0) {
                button = <div></div>
              } else {
                button = (
                  <button
                    onClick   = {() => removeParticipantListItem({index})}
                    className = 'PrepareMeetingDivItemButton'
                  > X </button>
                )
              }
              return (
                <Paper key = {index} className = 'PrepareMeetingDivItem' >
                  <TextField
                    underlineShow = {false}
                    value         = {participantsList[index]}
                    name          = {JSON.stringify(index)}
                    onChange      = {changeParticipantListItem}
                    multiLine     = {true}
                    rowsMax       = {3}
                  />
                  {button}
                </Paper>
              )
            })}
          </div>
          <Divider />
        </div>
        <div className = 'PrepareMeetingInfoDiv'>
          <Paper className = 'PrepareMeetingInfoPaper'>
            <h2> Meeting Goals </h2>
            <div className = 'PrepareMeetingInfoPaperItems'>
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
              <div>
                <RaisedButton
                  label   = 'Add'
                  onClick = {() => addGoalListItem()}
                  secondary = {true}
                />
              </div>
            </div>
          </Paper>

          <div className = 'PrepareMeetingDivList'>
            {goalList.map((item, index) => {
              return (
                <Paper key = {index} className = 'PrepareMeetingDivItem'>
                  <h2 style = {{padding: '4px'}}> {index + 1}. </h2>
                  <TextField
                    underlineShow = {false}
                    value         = {goalList[index].text}
                    name          = {JSON.stringify(index)}
                    onChange      = {changeGoalListItem}
                    multiLine     = {true}
                    rowsMax       = {3}
                  />
                  <button
                   onClick = {() => removeGoalListItem({index})}
                   className = 'PrepareMeetingDivItemButton'
                   >
                    X
                   </button>
                </Paper>
              )
            })}
          </div>
        </div>
      </div>
      <div style = {{height: '20px', color: 'red'}}>
        {goalError}
        {participantError}
        {titleError}
      </div>
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
