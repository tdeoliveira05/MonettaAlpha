import React from 'react'
import {withRouter} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const AlphaUserComponent = ({
  handleOnTempChange,
  handleSubmit,
  firstName,
  lastName,
  username,
  errorText,
  jobPosition,
  organization,
  referenceNotes,
  alphaErrors
}) => (
  <div className = "LogSig" >
      <h2> Join our Alpha Trials today and help us build a great tool for you! </h2>

      <div>
        <TextField
          floatingLabelText = "First Name*"
          name              = "firstName"
          onChange          = {handleOnTempChange}
          value             = {firstName}
          errorText         = {alphaErrors.firstName}
          errorStyle        = {{margin: '0', padding: '0'}}
        />
      </div>
      <div>
        <TextField
          floatingLabelText = "Last Name*"
          name              = "lastName"
          onChange          = {handleOnTempChange}
          value             = {lastName}
          errorText         = {alphaErrors.lastName}
          errorStyle        = {{margin: '0', padding: '0'}}
        />
      </div>

      <div>
        <TextField
          floatingLabelText = "Email*"
          name              = "username"
          onChange          = {handleOnTempChange}
          value             = {username}
          errorText         = {alphaErrors.email}
          errorStyle        = {{margin: '0', padding: '0'}}
        />
      </div>

      <div>
        <TextField
          floatingLabelText = "Job Position*"
          name              = "jobPosition"
          onChange          = {handleOnTempChange}
          value             = {jobPosition}
          errorText         = {alphaErrors.jobPosition}
          errorStyle        = {{margin: '0', padding: '0'}}
        />
      </div>

      <div>
        <TextField
          floatingLabelText = "Organization*"
          name              = "organization"
          onChange          = {handleOnTempChange}
          value             = {organization}
          errorText         = {alphaErrors.organization}
          errorStyle        = {{margin: '0', padding: '0'}}
        />
      </div>

      <div>
        <TextField
          floatingLabelText = "How did you hear about us?"
          name              = "referenceNotes"
          onChange          = {handleOnTempChange}
          value             = {referenceNotes}
        />
      </div>

      <div>
        <RaisedButton
          onClick   = {()=>handleSubmit('alpha')}
          label     = "Submit"
          secondary = {true}
          style     = {{marginTop: '20px'}}
        />
      </div>
  </div>
)

export default withRouter(AlphaUserComponent);
