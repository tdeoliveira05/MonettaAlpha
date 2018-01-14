import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'


const DumbConductMeeting = ({handleChange, setRef, handleTypeClick, deleteNoteItem, nextStep, previousStep, submitTempItem, errorText, goalList, formattedDuration, noteList, typeList, tempItemText, hasNotes, tempItemType, selectorAction, selectorDecision, selectorGeneral, selectedIndex, minutesElapsed, secondsElapsed}) => (
  <div className = 'ConductMeetingWrapper'>
    <div className = 'ConductMeetingContent'>
      <div className = 'ConductMeetingStopwatch'>
        <h1>{formattedDuration}</h1>
      </div>
      <div className = 'ConductMeetingPaper'>
        <Paper className = 'ConductMeetingGoalDisplay'>
          {goalList.map((item, index) => {
            return (
            <div key = {index} >
              <div className = 'ConductMeetingGoalItem'>
                <h2> {item} </h2>
                <Checkbox
                  style = {{width: '0px'}}
                  iconStyle = {{margin: '0', padding: '0'}}
                />
              </div>
              <Divider />
            </div>
            )
          })}
        </Paper>

        <Paper className = 'ConductMeetingTextDisplay'>
          <h3> Notes </h3>
          <div className = 'ConductMeetingTextNotesWrapper'>
            <div className = 'ConductMeetingTextNotes' ref = {setRef}>
              {noteList.map((item, index) => {
                  return (
                    <div key = {index} className = 'ConductMeetingTextItem' >
                      <Paper
                        style = {{backgroundColor: item.color}}
                        className = 'ConductMeetingTextItemPaper'
                      >
                        <div className = 'ConductMeetingTextItemHeading'>
                          <h3 style = {{margin: '0', padding: '0'}}> ({item.formattedTimeStamp}) - {item.type.toUpperCase()} </h3>
                          <FlatButton
                            name = ''
                            label = 'x'
                            labelStyle = {{color: 'white'}}
                            onClick = {() => deleteNoteItem(index)}
                          />
                        </div>
                        <p style = {{color: 'white', padding: '0', margin: '0', fontWeight: 'bold'}}> {item.text} </p>
                      </Paper>
                    </div>
                  )
                })
              }
            </div>

          </div>


        </Paper>


      </div>

      <div className = 'ConductMeetingSelect'>
        {typeList.map((item, index) => {

          if (item.activated) {
            var colorIndex = 1
            var selectionRight = (<FontIcon className = 'material-icons' color = {item.style.secondaryColor[colorIndex]} style = {{margin: '0', padding: '0'}}>keyboard_arrow_right</FontIcon>)
            var selectionLeft = (<FontIcon className = 'material-icons' color = {item.style.secondaryColor[colorIndex]} style = {{margin: '0', padding: '0'}}>keyboard_arrow_left</FontIcon>)
          } else {
            var selectionRight = ''
            var selectionLeft = ''
            var colorIndex = 0
          }

          return (
            <div key = {index} className = 'ConductMeetingSelectColumn'>
              {selectionRight}
              <Chip
                onClick = {() => handleTypeClick(index)}
                style = {{
                  backgroundColor: item.style.secondaryColor[colorIndex],
                  border: '1px solid ' + item.style.primaryColor[colorIndex],
                  cursor: 'pointer'
                }}
                labelStyle = {{color: item.style.primaryColor[colorIndex]}}
              >
              {item.text}
              </Chip>
              {selectionLeft}
            </div>
          )
        })}
      </div>
      <div className = 'ConductMeetingInput'>
        <div className = 'ConductMeetingInputText'>
          <TextField
            underlineShow = {true}
            name = 'tempItemText'
            value = {tempItemText}
            onChange = {handleChange}
            hintText = 'Speak to Monetta or type notes here'
            hintStyle = {{fontSize: '12px'}}
            fullWidth = {true}
            errorText = {errorText.inputText}
            onKeyPress = {(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                submitTempItem()
              }
            }}
          />
          </div>
        <div className = 'ConductMeetingInputEnter'>
          <RaisedButton
            label = 'Enter'
            primary = {true}
            onClick = {submitTempItem}
          />
        </div>

      </div>

      <div className = 'ConductMeetingStepper'>
        <h2> Proceed? </h2>
        <div className = 'ConductMeetingStepperButtons'>
          <FlatButton
            label = 'Back'
            primary = {true}
            onClick = {() => previousStep()}
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
export default DumbConductMeeting
