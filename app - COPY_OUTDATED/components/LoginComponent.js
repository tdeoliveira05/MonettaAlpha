import React from 'react'
import Link from 'react-router'
import Card from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


const LoginComponent = ({handleLoginSubmit, handleSigButton, onChange, errors, formUsername, formPassword}) => (
  <div className='LogSig'>
      <h2>Login</h2>

      {errors.summary && <p>{errors.summary}</p>}

      <div>
        <TextField
          floatingLabelText="Email"
          name="formUsername"
          errorText={errors.username}
          onChange={onChange}
          value={formUsername}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="formPassword"
          onChange={onChange}
          errorText={errors.password}
          value={formPassword}
          onKeyPress= {(ev) => {
            if (ev.key == 'Enter') {
              ev.preventDefault();
              handleLoginSubmit();
            }
          }}
        />
      </div>

      <div className="button-line">
        <RaisedButton onClick={()=>handleLoginSubmit()} label="Log in" primary />
        <RaisedButton onClick={()=>handleSigButton()} label="Sign up" />
      </div>
  </div>
);

export default LoginComponent;
