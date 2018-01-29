import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Button } from 'reactstrap'



const DumbReviewStandard = ({
  handleNoteItemChange,
  finishMeeting,
  previousStep,
  handleNoteItemDelete,
  categoryList,
  noteList
}) => (
  <div className = 'ReviewMeetingWrapper'>
    <div className = 'ReviewMeetingContent'>

      <div className = 'ReviewMeetingNotes'>

        <div className = 'ReviewMeetingNotesUnit'>
          <Paper className = 'ReviewMeetingNotesUnitHeading' style = {{ backgroundColor: categoryList.general.color, color: 'white'}}>
            <h2> General Notes </h2>
          </Paper>
          <Paper className = 'ReviewMeetingNotesUnitItems' style = {{ backgroundColor: 'white', color: categoryList.general.color}}>
            {noteList.map((noteItem, index) => {
              if (noteItem.category !== 'general') return
              return (
                <div className = 'ReviewMeetingNotesUnitItemDiv' key = {index}>
                  <TextField
                    underlineShow = {false}
                    multiLine = {true}
                    value = {noteItem.text}
                    name = {JSON.stringify(index)}
                    inputStyle = {{color: categoryList[noteItem.category].color, margin: '0', padding: '0'}}
                    style = {{width: '100%'}}
                    onChange = {(event) => handleNoteItemChange(event, index)}
                  />
                  <button
                    className = 'ReviewMeetingNotesUnitItemButton'
                    onClick = {() => handleNoteItemDelete(index)}
                  >
                    x
                  </button>
                </div>
              )
            })}
          </Paper>
        </div>

        <div className = 'ReviewMeetingNotesUnit'>
          <Paper className = 'ReviewMeetingNotesUnitHeading' style = {{ backgroundColor: categoryList.action.color, color: 'white'}}>
            <h2> Action Items </h2>
          </Paper>
          <Paper className = 'ReviewMeetingNotesUnitItems' style = {{ backgroundColor: 'white', color: categoryList.action.color}}>
            {noteList.map((noteItem, index) => {
              if (noteItem.category !== 'action') return
              return (
                <div className = 'ReviewMeetingNotesUnitItemDiv' key = {index}>
                  <TextField
                    underlineShow = {false}
                    multiLine = {true}
                    value = {noteItem.text}
                    name = {JSON.stringify(index)}
                    inputStyle = {{color: categoryList[noteItem.category].color, margin: '0', padding: '0'}}
                    style = {{width: '100%'}}
                    onChange = {(event) => handleNoteItemChange(event, index)}
                  />
                  <button
                    className = 'ReviewMeetingNotesUnitItemButton'
                    onClick = {() => handleNoteItemDelete(index)}
                  >
                    x
                  </button>
                </div>
              )
            })}
          </Paper>
        </div>

        <div className = 'ReviewMeetingNotesUnit'>
          <Paper className = 'ReviewMeetingNotesUnitHeading' style = {{ backgroundColor: categoryList.decision.color, color: 'white'}}>
            <h2> Team Decisions </h2>
          </Paper>
          <Paper className = 'ReviewMeetingNotesUnitItems' style = {{ backgroundColor: 'white', color: categoryList.decision.color}}>
            {noteList.map((noteItem, index) => {
              if (noteItem.category !== 'decision') return
              return (
                <div className = 'ReviewMeetingNotesUnitItemDiv' key = {index}>
                  <TextField
                    underlineShow = {false}
                    multiLine = {true}
                    value = {noteItem.text}
                    name = {JSON.stringify(index)}
                    inputStyle = {{color: categoryList[noteItem.category].color, margin: '0', padding: '0'}}
                    style = {{width: '100%'}}
                    onChange = {(event) => handleNoteItemChange(event, index)}
                  />
                  <button
                    className = 'ReviewMeetingNotesUnitItemButton'
                    onClick = {() => handleNoteItemDelete(index)}
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

export default withRouter(DumbReviewStandard)
