import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


const SignupComponent = ({handleLogSigActivate, handleSignupSubmit, handleLogButton, tempUsername, onChange, errors, formUsername, formPassword, formCode}) => (
  <div className="LogSig" >
      <h2>Create Account</h2>

      <div>
        <TextField
          floatingLabelText="Email"
          name="formUsername"
          errorText={errors.email}
          onChange={onChange}
          value={formUsername}
          defaultValue={tempUsername}
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
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Sign Up Code"
          name="formCode"
          onChange={onChange}
          errorText={errors.code}
          value={formCode}
        />
      </div>

      <div>
        <RaisedButton onClick={()=>handleSignupSubmit()} label="Sign Up" secondary={true} style={{marginTop: '20px'}} />
      </div>
      <div>
        <FlatButton onClick={()=>handleLogButton()} label="already have an account?" style={{marginTop: '20px'}}/>
      </div>
  </div>
);

export default SignupComponent;
