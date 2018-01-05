import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


const DumbHomeSignup = ({ handleSetDialogCall, handleSubmit, handleOnTempChange, tempErrors, username, password, code}) => (
  <div className="LogSig" >
      <h2>Create Account</h2>

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
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Sign Up Code"
          name="codeUsed"
          onChange={handleOnTempChange}
          errorText={tempErrors.codeUsed}
          value={code}
        />
      </div>

      <div>
        <RaisedButton onClick={() => handleSubmit('signup')} label="Sign Up" secondary={true} style={{marginTop: '20px'}} />
      </div>
      <div>
        <FlatButton onClick={() => handleSetDialogCall('login')} label="already have an account?" style={{marginTop: '20px'}}/>
      </div>
  </div>
);

export default DumbHomeSignup;
