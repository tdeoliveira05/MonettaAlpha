import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'



const DumbReviewMeeting = ({handleNoteItemChange, finishMeeting, previousStep, generalNotesList, actionItemsList, teamDecisionsList}) => (
  <div className = 'ReviewMeetingWrapper'>
    <div className = 'ReviewMeetingContent'>

      <div className = 'ReviewMeetingNotes'>

        <div className = 'ReviewMeetingNotesUnit'>
          <Paper className = 'ReviewMeetingNotesUnitHeading' style = {{ backgroundColor: generalNotesList[0].color, color: 'white'}}>
            <h2> General Notes </h2>
          </Paper>
          <Paper className = 'ReviewMeetingNotesUnitItems' style = {{ backgroundColor: 'white', color: generalNotesList[0].color}}>
            {generalNotesList.map((item, index) => {
              return (
                <div className = 'ReviewMeetingNotesUnitItemDiv' key = {index}>
                  <TextField
                    underlineShow = {false}
                    multiLine = {true}
                    value = {item.text}
                    name = {'action[' + index + ']'}
                    inputStyle = {{color: item.color, margin: '0', padding: '0'}}
                    style = {{width: '100%'}}
                    onChange = {handleNoteItemChange}
                  />
                </div>
              )
            })}
          </Paper>
        </div>

        <div className = 'ReviewMeetingNotesUnit'>
          <Paper className = 'ReviewMeetingNotesUnitHeading' style = {{ backgroundColor: actionItemsList[0].color, color: 'white'}}>
            <h2> Action Items </h2>
          </Paper>
          <Paper className = 'ReviewMeetingNotesUnitItems' style = {{ backgroundColor: 'white', color: actionItemsList[0].color}}>
            {actionItemsList.map((item, index) => {
              return (
                <div className = 'ReviewMeetingNotesUnitItemDiv' key = {index}>
                  <TextField
                    underlineShow = {false}
                    multiLine = {true}
                    value = {item.text}
                    name = {'action[' + index + ']'}
                    inputStyle = {{color: item.color, margin: '0', padding: '0'}}
                    style = {{width: '100%'}}
                    onChange = {handleNoteItemChange}
                  />
                </div>
              )
            })}
          </Paper>
        </div>

        <div className = 'ReviewMeetingNotesUnit'>
          <Paper className = 'ReviewMeetingNotesUnitHeading' style = {{ backgroundColor: teamDecisionsList[0].color, color: 'white'}}>
            <h2> Team Decisions </h2>
          </Paper>
          <Paper className = 'ReviewMeetingNotesUnitItems' style = {{ backgroundColor: 'white', color: teamDecisionsList[0].color}}>
            {teamDecisionsList.map((item, index) => {
              return (
                <div className = 'ReviewMeetingNotesUnitItemDiv' key = {index}>
                  <TextField
                    underlineShow = {false}
                    multiLine = {true}
                    value = {item.text}
                    name = {'action[' + index + ']'}
                    inputStyle = {{color: item.color, margin: '0', padding: '0'}}
                    style = {{width: '100%'}}
                    onChange = {handleNoteItemChange}
                  />
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
            label = 'Submit'
            secondary = {true}
            onClick = {() => finishMeeting()}
            />
        </div>
      </div>


    </div>
  </div>
)

export default DumbReviewMeeting
