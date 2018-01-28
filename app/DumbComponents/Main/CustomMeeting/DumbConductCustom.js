import React from 'react'
import {withRouter} from 'react-router-dom'
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
import DropDownMenu from 'material-ui/DropDownMenu'


const DumbConductCustom = ({
  handleChange,
  meetingInfoHeading,
  setRef,
  handleTypeClick,
  deleteNoteItem,
  nextStep,
  submitTempItem,
  errorText,
  goalList,
  formattedDuration,
  noteList,
  categoryList,
  tempItemText,
  hasNotes,
  tempItemType,
  selectorAction,
  selectorDecision,
  selectorGeneral,
  selectedIndex,
  minutesElapsed,
  secondsElapsed,
  changeItemType,
  tempItemColor,
  tempItemCategory,
  meetingData
}) => (
  <div>
    <div>
      <div className  = 'MeetingHeader' style = {{border: 'none', margin: '0', padding: '0'}}> <h1 style = {{margin: '10px 0px 0px 0px', padding: '0'}}>{meetingData.title + ' (' + meetingData.meetingStats.timeElapsed.formattedExpectedDuration + ')'}</h1> </div>
    </div>
    <div className = 'ConductMeetingWrapper'>
      <div className = 'ConductMeetingContent'>
        <div style = {{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0', padding: '0'}}>
          <p style = {{color: 'gray', margin: '0', padding: '0'}}> {localStorage.fullName + ',' + meetingData.participants.map((participantsItem) => ' ' + participantsItem.fullName)} </p>
          <p style = {{color: 'gray', margin: '0', padding: '0'}}> {meetingData.location} </p>
        </div>
        <div className = 'ConductMeetingStopwatch'>
          <h1>{formattedDuration}</h1>
        </div>
        <div className = 'ConductMeetingPaper' style = {{justifyContent: 'center', height: '230px'}} >

          <Paper className = 'ConductMeetingTextDisplay' style = {{width: '80%'}}>
            <h3> Notes </h3>
            <div className = 'ConductMeetingTextNotesWrapper'>
              <div className = 'ConductMeetingTextNotes' ref = {setRef}>
                {noteList.map((noteItem, index) => {
                    return (
                      <div key = {index} className = 'ConductMeetingTextItem' >
                        <Paper
                          style = {{backgroundColor: categoryList[noteItem.category].color}}
                          className = 'ConductMeetingTextItemPaper'
                        >
                          <div className = 'ConductMeetingTextItemHeading'>
                            <div className = 'ConductMeetingTextItemHeadingInfo'>
                              <h3 style = {{color: 'white'}}> {'(' + noteItem.formattedTimeStamp + ')'} </h3>
                              <DropDownMenu
                                value = {noteItem.category}
                                onChange = {(event, key, value) => changeItemType(event, key, value, index, noteItem)}
                                labelStyle = {{paddingLeft: '5px', paddingRight: '0', fontSize: '0.9em', fontWeight: 'bold', color: 'white'}}
                                underlineStyle = {{border: 'none'}}
                                iconStyle = {{padding: '0px 0px 0px 45px'}}
                                style = {{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100px', height: '100%'}}
                              >
                                {Object.values(categoryList).map((categoryItem, index) => {
                                  var menuItem // this if loop will cause the note item's type to be disabled such that the user cant click it to avoid confusion
                                  if (categoryItem.category === noteItem.category) {
                                    menuItem = <MenuItem key = {index} disabled = {true} label = {categoryItem.category.toUpperCase()} value = {categoryItem.category} primaryText = {categoryItem.text} />
                                  } else {
                                    menuItem = <MenuItem key = {index} label = {categoryItem.category.toUpperCase()} value = {categoryItem.category} primaryText = {categoryItem.text} />
                                  }
                                  return menuItem
                                })}
                              </DropDownMenu>
                            </div>

                            <FlatButton
                              label = 'x'
                              labelStyle = {{color: 'white'}}
                              onClick = {() => deleteNoteItem(index)}
                            />
                          </div>

                          <div className = 'ConductMeetingTextItemText'>
                            <p style = {{color: 'white', padding: '10px', margin: '0', fontWeight: 'bold'}}> {noteItem.text} </p>
                          </div>


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
          {Object.values(categoryList).map((categoryItem, index) => {
            if (categoryItem.category === tempItemCategory) {
              var primaryColor = categoryItem.color
              var secondaryColor = 'white'
              var selectionRight = (<FontIcon className = 'material-icons' color = {categoryItem.color} style = {{margin: '0', padding: '0'}}>keyboard_arrow_right</FontIcon>)
              var selectionLeft = (<FontIcon className = 'material-icons' color = {categoryItem.color} style = {{margin: '0', padding: '0'}}>keyboard_arrow_left</FontIcon>)
            } else {
              var primaryColor = 'white'
              var secondaryColor = categoryItem.color
              var selectionRight = ''
              var selectionLeft = ''
            }

            return (
              <div key = {index} className = 'ConductMeetingSelectColumn'>
                {selectionRight}
                <Chip
                  onClick = {() => handleTypeClick(categoryItem.category)}
                  style = {{
                    backgroundColor: primaryColor,
                    border: '1px solid ' + secondaryColor,
                    cursor: 'pointer'
                  }}
                  labelStyle = {{color: secondaryColor}}
                >
                {categoryItem.text}
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
      </div>
      <div className = 'ConductMeetingStepper'>
        <h2 style = {{margin: '0px 0px 5px 0px', padding: '0'}}> Finished? </h2>
        <div className = 'ConductMeetingStepperButtons'>
          <RaisedButton
            label = 'Save meeting'
            primary = {true}
            onClick = {() => nextStep()}
            fullWidth
            style = {{marginBottom: '20px'}}
            />
        </div>
      </div>
    </div>
  </div>
)
export default withRouter(DumbConductCustom)
