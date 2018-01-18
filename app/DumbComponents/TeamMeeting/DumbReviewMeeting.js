import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Button } from 'reactstrap'



const DumbReviewMeeting = ({
  handleNoteItemChange,
  finishMeeting,
  previousStep,
  handleNoteItemDelete,
  generalNotesList,
  typeList,
  actionItemsList,
  teamDecisionsList
}) => (
  <div className = 'ReviewMeetingWrapper'>
    <div className = 'ReviewMeetingContent'>

      <div className = 'ReviewMeetingNotes'>

        <div className = 'ReviewMeetingNotesUnit'>
          <Paper className = 'ReviewMeetingNotesUnitHeading' style = {{ backgroundColor: typeList[0].style.primaryColor[0], color: 'white'}}>
            <h2> General Notes </h2>
          </Paper>
          <Paper className = 'ReviewMeetingNotesUnitItems' style = {{ backgroundColor: 'white', color: typeList[0].style.primaryColor[0]}}>
            {generalNotesList.map((item, index) => {
              var targetString = 'general[' + index + ']'
              return (
                <div className = 'ReviewMeetingNotesUnitItemDiv' key = {index}>
                  <TextField
                    underlineShow = {false}
                    multiLine = {true}
                    value = {item.text}
                    name = {targetString}
                    inputStyle = {{color: item.color, margin: '0', padding: '0'}}
                    style = {{width: '100%'}}
                    onChange = {handleNoteItemChange}
                  />
                  <button
                    className = 'ReviewMeetingNotesUnitItemButton'
                    onClick = {() => handleNoteItemDelete(targetString)}
                  >
                    x
                  </button>
                </div>
              )
            })}
          </Paper>
        </div>

        <div className = 'ReviewMeetingNotesUnit'>
          <Paper className = 'ReviewMeetingNotesUnitHeading' style = {{ backgroundColor: typeList[1].style.primaryColor[0], color: 'white'}}>
            <h2> Action Items </h2>
          </Paper>
          <Paper className = 'ReviewMeetingNotesUnitItems' style = {{ backgroundColor: 'white', color: typeList[1].style.primaryColor[0]}}>
            {actionItemsList.map((item, index) => {
              var targetString = 'action[' + index + ']'
              return (
                <div className = 'ReviewMeetingNotesUnitItemDiv' key = {index}>
                  <TextField
                    underlineShow = {false}
                    multiLine = {true}
                    value = {item.text}
                    name = {targetString}
                    inputStyle = {{color: item.color, margin: '0', padding: '0'}}
                    style = {{width: '100%'}}
                    onChange = {handleNoteItemChange}
                  />
                  <button
                    className = 'ReviewMeetingNotesUnitItemButton'
                    onClick = {() => handleNoteItemDelete(targetString)}
                  >
                    x
                  </button>
                </div>
              )
            })}
          </Paper>
        </div>

        <div className = 'ReviewMeetingNotesUnit'>
          <Paper className = 'ReviewMeetingNotesUnitHeading' style = {{ backgroundColor: typeList[2].style.primaryColor[0], color: 'white'}}>
            <h2> Team Decisions </h2>
          </Paper>
          <Paper className = 'ReviewMeetingNotesUnitItems' style = {{ backgroundColor: 'white', color: typeList[2].style.primaryColor[0]}}>
            {teamDecisionsList.map((item, index) => {
              var targetString = 'decision[' + index + ']'
              return (
                <div className = 'ReviewMeetingNotesUnitItemDiv' key = {index}>
                  <TextField
                    underlineShow = {false}
                    multiLine = {true}
                    value = {item.text}
                    name = {targetString}
                    inputStyle = {{color: item.color, margin: '0', padding: '0'}}
                    style = {{width: '100%'}}
                    onChange = {handleNoteItemChange}
                  />
                  <button
                    className = 'ReviewMeetingNotesUnitItemButton'
                    onClick = {() => handleNoteItemDelete(targetString)}
                  >
                    x
                  </button>
                </div>
              )
            })}
          </Paper>
        </div>




      </div>
      <div className = 'ReviewMeetingStats'>

      </div>

      <div className = 'ReviewMeetingStepper'>
        <h2> Submit to Document Storage? </h2>
        <div className = 'ReviewMeetingStepperButtons'>
          <FlatButton
            label = 'Back'
            primary = {true}
            onClick = {() => previousStep()}
            />
          <RaisedButton
            label = 'Save'
            secondary = {true}
            onClick = {() => finishMeeting()}
            />
        </div>
      </div>


    </div>
  </div>
)

export default DumbReviewMeeting
