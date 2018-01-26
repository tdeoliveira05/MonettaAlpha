import React from 'react'
import {withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'


const DumbDashboard = ({
  redirectToPath
}) => {
  return (
  <div className = 'ChooseMeetingWrapper'>
    <div className = 'ChooseMeetingContent'>

      <div className = 'ChooseMeetingHeader'>
        <h1> What kind of meeting would you like to host? </h1>
      </div>

      <div className = 'ChooseMeetingOptions'>
        <div className = 'ChooseMeetingOptionPaperDiv'>
          <Paper className = 'ChooseMeetingOptionPaper'>
            <h2> Normal Meeting </h2>
            <p> This will allow you to easily prepare an agenda for the meeting and set it up to have a more complex meeting. </p>
            <p> You can set default meeting settings in the Settings tab in case you are part of an established team </p>

          </Paper>
          <RaisedButton
            name = ''
            label = 'Prepare a Meeting'
            secondary = {true}
            style = {{width: '100%'}}
            onClick = {() => redirectToPath('/meeting')}
          />
        </div>
        <div className = 'ChooseMeetingOptionPaperDiv'>
          <Paper className = 'ChooseMeetingOptionPaper'>
            <h2> Quick Meeting </h2>
            <p> Having an impromptu meeting? No worries we got you covered. You can skip right to the good part and use your default settings </p>
            <p> To change your default quick meeting settings, visit the Settings tab. </p>
          </Paper>
          <RaisedButton
            name = ''
            label = 'Start Quick Meeting'
            primary = {true}
            style = {{width: '100%'}}
          />
        </div>
      </div>
    </div>
  </div>
)}

export default withRouter(DumbDashboard)
