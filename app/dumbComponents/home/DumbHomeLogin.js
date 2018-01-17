import React from 'react'
import Link from 'react-router'
import Card from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


const DumbHomeLogin = ({handleSubmit, handleSetDialogCall, handleOnTempChange, tempErrors, username, password}) => (
  <div className='LogSig'>
      <h2>Login</h2>
      <div>
        <TextField
          floatingLabelText="Email"
          name="username"
          errorText={tempErrors.username}
          onChange={handleOnTempChange}
          value={username}
        />
      </div>
      <div>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={handleOnTempChange}
          errorText={tempErrors.password}
          value={password}
          onKeyPress= {(ev) => {
            if (ev.key == 'Enter') {
              ev.preventDefault();
              handleSubmit('login');
            }
          }}
        />
      </div>

      <div className="button-line">
        <RaisedButton onClick={()=>handleSubmit('login')} label="Log in" primary />
        <RaisedButton onClick={()=>handleSetDialogCall('signup')} label="Sign up" />
      </div>
  </div>
);

export default DumbHomeLogin;
