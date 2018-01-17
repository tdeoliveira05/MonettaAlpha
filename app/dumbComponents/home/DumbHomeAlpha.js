import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const AlphaUserComponent = ({handleOnTempChange, handleSubmit, firstName, lastName, username, jobPosition, organization, referenceNotes}) => (
  <div className="LogSig" >
      <h2>Join our Alpha Trials today and help us build a great tool for you!</h2>

      <div>
        <TextField
          floatingLabelText="First Name"
          name="firstName"
          onChange={handleOnTempChange}
          value={firstName}
        />
      </div>
      <div>
        <TextField
          floatingLabelText="Last Name"
          name="lastName"
          onChange={handleOnTempChange}
          value={lastName}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Email"
          name="username"
          onChange={handleOnTempChange}
          value={username}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Job Position"
          name="jobPosition"
          onChange={handleOnTempChange}
          value={jobPosition}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Company"
          name="organization"
          onChange={handleOnTempChange}
          value={organization}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="How did you hear about us?"
          name="referenceNotes"
          onChange={handleOnTempChange}
          value={referenceNotes}
        />
      </div>

      <div>
        <RaisedButton onClick={()=>handleSubmit('alpha')} label="Submit" secondary={true} style={{marginTop: '20px'}} />
      </div>
  </div>
)

export default AlphaUserComponent;
