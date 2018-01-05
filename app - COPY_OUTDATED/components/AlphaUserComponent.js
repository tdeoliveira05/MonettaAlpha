import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const AlphaUserComponent = ({onChange, firstName, lastName, email, position, company, reference, tempUsername, sendAlphaEmail}) => (
  <div className="LogSig" >
      <h2>Send us your information and we will get back to you!</h2>

      <div>
        <TextField
          floatingLabelText="First Name"
          name="alphaFirstName"
          onChange={onChange}
          value={firstName}
        />
      </div>
      <div>
        <TextField
          floatingLabelText="Last Name"
          name="alphaLastName"
          onChange={onChange}
          value={lastName}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Email"
          name="alphaEmail"
          onChange={onChange}
          value={email}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Job Position"
          name="alphaPosition"
          onChange={onChange}
          value={position}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Company"
          name="alphaCompany"
          onChange={onChange}
          value={company}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="How did you hear about us?"
          name="alphaReference"
          onChange={onChange}
          value={reference}
        />
      </div>

      <div>
        <RaisedButton onClick={()=>sendAlphaEmail()} label="Submit" secondary={true} style={{marginTop: '20px'}} />
      </div>
  </div>
)

export default AlphaUserComponent;
