import React from 'react'
import {withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import logo from '../../assets/images/logo2.png'


const DumbWelcomePage = ({
  firstName,
  firstNameError,
  lastName,
  lastNameError,
  jobPosition,
  jobPositionError,
  organization,
  organizationError,
  submitUserUpdate,
  handleChangeState
}) => (
  <div className = 'HybridWelcomeWrapper'>
    <Paper className = 'HybridWelcomePaper' zDepth = {4}>
      <div className = 'HybridWelcomeContent'>
        <img src = {logo} height = {60} width = {60}/>
        <h2 style = {{marginTop: '50px'}}> Welcome, </h2>
        <h2 style = {{margin: '0', padding: '0'}}> We just need a bit more information to get started</h2>
        <div className = 'HybridWelcomePageText'>
          <TextField
            hintText          = 'First Name'
            name              = 'firstName'
            value             = {firstName}
            onChange          = {handleChangeState}
            errorText         = {firstNameError}
            onKeyPress        = {(event) => {
              if (event.key == 'Enter') {
                event.preventDefault()
                submitUserUpdate()
              }
            }}
          />
          <TextField
            hintText          = 'Last Name'
            name              = 'lastName'
            onChange          = {handleChangeState}
            value             = {lastName}
            errorText         = {lastNameError}
            onKeyPress        = {(event) => {
              if (event.key == 'Enter') {
                event.preventDefault()
                submitUserUpdate()
              }
            }}
          />
          <TextField
            hintText          = 'Job Position'
            name              = 'jobPosition'
            onChange          = {handleChangeState}
            value             = {jobPosition}
            errorText         = {jobPositionError}
            onKeyPress        = {(event) => {
              if (event.key == 'Enter') {
                event.preventDefault()
                submitUserUpdate()
              }
            }}
          />
          <TextField
            hintText          = 'Organization'
            name              = 'organization'
            onChange          = {handleChangeState}
            value             = {organization}
            errorText         = {organizationError}
            onKeyPress        = {(event) => {
              if (event.key == 'Enter') {
                event.preventDefault()
                submitUserUpdate()
              }
            }}
          />
        </div>
        <div>
          <RaisedButton
            label   = 'submit'
            style   = {{width: '20%', minWidth: '250px'}}
            onClick = {submitUserUpdate}
            secondary = {true}
          />
        </div>
      </div>
    </Paper>
  </div>
)

export default withRouter(DumbWelcomePage)
