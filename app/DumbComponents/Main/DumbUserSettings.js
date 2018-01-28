import React from 'react'
import {withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import Snackbar from 'material-ui/Snackbar'


const DumbUserSettings = ({
  changeExpectedDuration,
  tempMins,
  defaultTitle,
  defaultLocation,
  onChange,
  onCheck,
  participantsList,
  onSave,
  onDelete,
  onReset,
  onAdd,
  onParticipantChange,
  snackbarOpen,
  handleSnackbarOpen,
  automaticEmails,
  titleError,
  participantError,
  locationError
}) => (
  <div className = 'UserSettingsWrapper'>
    <div className = 'UserSettings'>
      <Paper className = 'UserSettingsPaper'>
        <h1> Set your default Quick Meeting settings: </h1>


        <div className = 'UserSettingsInfo'>
          <div className = 'UserSettingsColumn'>
            <div className = 'UserSettingsInfoRow'>
              <h3> Default Title: </h3>
              <TextField
                name = 'title'
                value = {defaultTitle}
                onChange = {onChange}
                errorText = {titleError}
                style = {{width: '60%', fontSize: '1.1em'}}
                inputStyle = {{paddingLeft: '5px'}}
              />
            </div>
            <div className = 'UserSettingsInfoRow'>
              <h3> Default Location: </h3>
              <TextField
                name = 'location'
                value = {defaultLocation}
                errorText = {locationError}
                onChange = {onChange}
                style = {{width: '50%', fontSize: '1.1em'}}
                inputStyle = {{paddingLeft: '5px'}}
              />
            </div>
            <div className = 'UserSettingsInfoRow' style = {{textAlign: 'center'}}>
              <Checkbox
                label="Automatically send out minutes"
                labelPosition="left"
                onCheck = {onCheck}
                checked = {automaticEmails}
                labelStyle = {{fontWeight: 'bold', paddingLeft: '5px'}}
                iconStyle = {{padding: '0', margin: '0'}}
              />
            </div>
          </div>

          <div className = 'UserSettingsColumn' style = {{textAlign: 'center'}}>
            <h3 style = {{marginBottom: '0', paddingBottom: '0'}}> Default expected duration </h3>
            <h2 style = {{marginBottom: '0', paddingBottom: '0'}}> {tempMins} </h2>
            <h3 style = {{marginTop: '0', paddingTop: '0'}}> mins </h3>
            <div className = 'UserSettingsButtonRow'>
              <button onClick = {() => changeExpectedDuration(15)} style = {{color: '#ffac4d', border: '1px solid #ffac4d', borderRadius: '5px'}}> 15 </button>
              <button onClick = {() => changeExpectedDuration(30)} style = {{color: '#6699ff', border: '1px solid #6699ff', borderRadius: '5px'}}> 30 </button>
              <button onClick = {() => changeExpectedDuration(60)} style = {{color: 'gray', border: '1px solid gray', borderRadius: '5px'}}> 60 </button>
            </div>
          </div>

          <div className = 'Divider'> </div>

          <div className = 'UserSettingsBottomColumn'>
            <div>
              <h2 style = {{margin: '0', padding: '0'}}> Default participants </h2>
            </div>
            <div className = 'Divider'></div>
            {participantsList.map((item, index) => {
              if (index === 0) {
                return (
                  <div key = {index} className = 'UserSettingsParticipantInfo' >
                    <div>
                      <h3 style = {{margin: '0px 0px 5px 0px', padding: '0'}}> Full name </h3>
                      <input type ='text' value = {item.fullName} style = {{border: 'none'}} readOnly/>
                    </div>
                    <div>
                      <h3 style = {{margin: '0px 0px 5px 0px', padding: '0'}}> Email </h3>
                      <input type ='text' value = {item.email} style = {{border: 'none'}} readOnly/>
                    </div>
                    <div style = {{width: '30px'}}></div>
                  </div>
                )
              } else if (index === participantsList.length - 1 && participantsList.length !== 2) {
                return (
                  <div key = {index}  className = 'UserSettingsParticipantInfoContainer'>
                     <div className = 'UserSettingsParticipantInfo' style = {{width: '100%'}}>
                      <input type ='text' required value = {item.fullName}  onChange = {(event) => onParticipantChange(event, index, 'fullName')}/>
                      <input type ='text' required value = {item.email} onChange = {(event) => onParticipantChange(event, index, 'email')}/>
                      <button className = 'UserSettingsParticipantRemoveButton' onClick = {() => onDelete(index)}> X </button>
                    </div>
                    <button className = 'UserSettingsParticipantAddButton' onClick = {() => onAdd()}> + Add Participant </button>
                  </div>
                )
              } else if (index === participantsList.length - 1 && participantsList.length === 2)  {
                return (
                  <div key = {index}  className = 'UserSettingsParticipantInfoContainer'>
                     <div className = 'UserSettingsParticipantInfo' style = {{width: '100%'}}>
                      <input type ='text' required value = {item.fullName} onChange = {(event) => onParticipantChange(event, index, 'fullName')}/>
                      <input type ='text' required value = {item.email} onChange = {(event) => onParticipantChange(event, index, 'email')}/>
                      <div style = {{width: '30px'}}></div>
                    </div>
                    <button className = 'UserSettingsParticipantAddButton' onClick = {() => onAdd()}> + Add Participant </button>
                  </div>
                )
              } else {
                return (
                  <div key = {index} className = 'UserSettingsParticipantInfo'>
                     <input type ='text' required value = {item.fullName} onChange = {(event) => onParticipantChange(event, index, 'fullName')}/>
                     <input type ='text' required value = {item.email} onChange = {(event) => onParticipantChange(event, index, 'email')}/>
                     <button className = 'UserSettingsParticipantRemoveButton' onClick = {() => onDelete(index)}> X </button>
                  </div>
                )
              }

            })}
            <p style = {{textAlign: 'center', color: 'red'}}> {participantError} </p>
          </div>

        </div>
        <div style = {{margin: '20px'}}>
          <RaisedButton
            label = 'Save'
            primary
            style = {{width: '50px', float: 'right'}}
            onClick = {() => onSave()}
          />
          <FlatButton
            label = 'Reset Fields'
            style = {{width: '50px', float: 'right', color: 'gray'}}
            onClick = {() => onReset()}
          />
        </div>
      </Paper>
    </div>
    <Snackbar
      open = {snackbarOpen}
      onRequestClose = {handleSnackbarOpen}
      autoHideDuration = {4000}
      message = 'Your settings have been saved!'
      style = {{textAlign: 'center'}}
    />
  </div>
)

export default withRouter(DumbUserSettings)
