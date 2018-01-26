import React from 'react'
import {withRouter} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


const DumbHomeSignup = ({
  handleSetDialogCall,
  handleSubmit,
  handleOnTempChange,
  username,
  password,
  confirmPassword,
  signupErrors,
  code
}) => (
  <div className="LogSig" >
      <h2>Create Account</h2>

      <div>
        <TextField
          floatingLabelText = "Email"
          name              = "username"
          onChange          = {handleOnTempChange}
          value             = {username}
          errorText         = {signupErrors.email}
        />
      </div>

      <div>
        <TextField
          floatingLabelText = "Password"
          type              = "password"
          name              = "password"
          onChange          = {handleOnTempChange}
          value             = {password}
          errorText         = {signupErrors.password}
        />
      </div>

      <div>
        <TextField
          floatingLabelText = "Confirm Password"
          type              = "password"
          name              = "confirmPassword"
          onChange          = {handleOnTempChange}
          value             = {confirmPassword}
          errorText         = {signupErrors.password}
        />
      </div>

      <div>
        <TextField
          floatingLabelText = "Sign Up Code"
          name              ="codeUsed"
          onChange          = {handleOnTempChange}
          value             = {code}
          errorText         = {signupErrors.code}
        />
      </div>

      <div>
        <RaisedButton
          onClick   = {() => handleSubmit('signup')}
          label     = "Sign Up"
          secondary = {true}
          style     = {{marginTop: '20px'}}
        />
      </div>
      <div>
        <FlatButton
          onClick = {() => handleSetDialogCall('login')}
          label   = "already have an account?"
          style   = {{marginTop: '20px'}}
        />
      </div>
  </div>
);

export default withRouter(DumbHomeSignup)
