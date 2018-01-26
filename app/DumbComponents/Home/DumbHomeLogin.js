import React from 'react'
import {withRouter} from 'react-router-dom'
import Link from 'react-router'
import Card from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


const DumbHomeLogin = ({
  handleSubmit,
  handleSetDialogCall,
  handleOnTempChange,
  username,
  password,
  loginErrors
}) => (
  <div className = 'LogSig'>
      <h2> Login </h2>
      <div>
        <TextField
          floatingLabelText = "Email"
          name              = "username"
          onChange          = {handleOnTempChange}
          value             = {username}
          errorText         = {loginErrors.email}
        />
      </div>
      <div>
        <TextField
          floatingLabelText = "Password"
          type              = "password"
          name              = "password"
          onChange          = {handleOnTempChange}
          value             = {password}
          errorText         = {loginErrors.password}
          onKeyPress = {(ev) => {
            if (ev.key == 'Enter') {
              ev.preventDefault()
              handleSubmit('login')
            }
          }}
        />
      </div>

      <div className = "button-line">
        <RaisedButton
          onClick = {()=>handleSetDialogCall('signup')}
          label   = "Sign up"
        />
        <RaisedButton
          onClick = {()=>handleSubmit('login')}
          label   ="Log in"
          primary = {true}
        />
      </div>
  </div>
);

export default withRouter(DumbHomeLogin);
