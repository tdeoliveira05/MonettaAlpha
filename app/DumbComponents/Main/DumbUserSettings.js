import React from 'react'
import {withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'


const DumbUserSettings = ({
  changeExpectedDuration,
  tempMins,
  defaultTitle,
  defaultLocation,
  onChange,
  onCheck,
  participantsList
}) => (
  <div className = 'UserSettingsWrapper'>
    <div className = 'UserSettings'>
      <Paper className = 'UserSettingsPaper'>



        <h1> Set your Quick Meeting default settings: </h1>


        <div className = 'UserSettingsInfo'>
          <div className = 'UserSettingsColumn'>
            <div className = 'UserSettingsInfoRow'>
              <h3> Default Title: </h3>
              <TextField
                name = 'title'
                value = {defaultTitle}
                onChange = {onChange}
                style = {{width: '60%', fontSize: '1.1em'}}
                inputStyle = {{paddingLeft: '5px'}}
              />
            </div>
            <div className = 'UserSettingsInfoRow'>
              <h3> Default Location: </h3>
              <TextField
                name = 'location'
                value = {defaultLocation}
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
                checked = {true}
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

          <div style = {{borderBottom: '1px solid rgb(230,230,230)', width: '100%', margin: '10px 0px 10px 0px'}}> </div>

          <div className = 'UserSettingsBottomColumn'>
            <div>
              <h2 style = {{margin: '0', padding: '0', marginBottom: '10px'}}> Default participants </h2>
              <RaisedButton
                label = 'Add participant'
                fullWidth = {true}
              />
            </div>
            <div style = {{display: 'flex', width: '80%', justifyContent: 'space-around', margin: '0', padding: '0', marginTop: '10px'}}>
              <h3 style = {{margin: '0', padding: '0'}}> Full Name </h3>
              <h3 style = {{margin: '0', padding: '0'}}> Email </h3>
            </div>
            {participantsList.map((item, index) => {
              if (index === 0) {

              }
              return (
                <div key = {index} className = 'UserSettingsParticipantInfo'>
                  <input type ='text' style = {{border: '1px solid rgb(210, 210, 210)', borderRadius: '2px 0px 0px 2px', boxShadow: 'none', padding: '2px'}}/>
                  <input type ='text' style = {{border: '1px solid rgb(210, 210, 210)', borderRadius: '0px 2px 2px 0px', boxShadow: 'none', padding: '2px'}}/>
                  <button style = {{color: '#6699ff', border: '1px solid #6699ff', borderRadius: '5px', marginLeft: '5px'}}> X </button>
                </div>
              )
            })}
          </div>

        </div>



        <RaisedButton
          label = 'Save'
          primary
        />
      </Paper>
    </div>
  </div>
)

export default withRouter(DumbUserSettings)
