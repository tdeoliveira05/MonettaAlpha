import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import logo from '../../assets/images/logo2.png'

export default class HybridWelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userTokenObj: this.props.userTokenObj,
      updateObj : {
        firstName: '',
        lastName: '',
        organization: '',
        jobPosition: ''
      },
      errorText: {
        firstName: '',
        lastName: '',
        jobPosition: '',
        organization: ''
      },
      errorPresent: false
    }

    this.handleChangeState = this.handleChangeState.bind(this)
    this.submitUserUpdate  = this.submitUserUpdate.bind(this)
    this.checkForInfoErrors = this.checkForInfoErrors.bind(this)
  }

  checkForInfoErrors () {


    var errorTextVal = {}
    var errorPresentVal = false

    Object.keys(this.state.errorText).map((errorTextKey) => {
      if (this.state.updateObj[errorTextKey] === '') {
        console.log('some field is empty')
        errorTextVal[errorTextKey] = 'required'
        errorPresentVal = true
      } else {
        errorTextVal[errorTextKey] = ''
      }
    })

    if (errorPresentVal) {
      this.setState({errorPresent: errorPresentVal, errorText: errorTextVal})
      return true
    } else {
      this.setState({errorPresent: errorPresentVal, errorText: errorTextVal})
      return false
    }

  }

  handleChangeState (event) {
    var updateObjVal = this.state.updateObj
    updateObjVal[event.target.name] = event.target.value
    this.setState({updateObj: updateObjVal})

    if (this.state.errorPresent) this.checkForInfoErrors()

  }

  submitUserUpdate () {
    var errorPresent = this.checkForInfoErrors()

    if (!errorPresent) {
      this.props.updateUserDocument({
        firstName: this.state.updateObj.firstName,
        lastName: this.state.updateObj.lastName,
        organization: this.state.updateObj.organization,
        jobPosition: this.state.updateObj.jobPosition
      })
    }
  }



  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
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
                value             = {this.state.updateObj.firstName}
                onChange          = {this.handleChangeState}
                errorText         = {this.state.errorText.firstName}
                onKeyPress        = {(event) => {
                  if (event.key == 'Enter') {
                    event.preventDefault()
                    this.submitUserUpdate()
                  }
                }}
              />
              <TextField
                hintText          = 'Last Name'
                name              = 'lastName'
                onChange          = {this.handleChangeState}
                value             = {this.state.updateObj.lastName}
                errorText         = {this.state.errorText.lastName}
                onKeyPress        = {(event) => {
                  if (event.key == 'Enter') {
                    event.preventDefault()
                    this.submitUserUpdate()
                  }
                }}
              />
              <TextField
                hintText          = 'Job Position'
                name              = 'jobPosition'
                onChange          = {this.handleChangeState}
                value             = {this.state.updateObj.jobPosition}
                errorText         = {this.state.errorText.jobPosition}
                onKeyPress        = {(event) => {
                  if (event.key == 'Enter') {
                    event.preventDefault()
                    this.submitUserUpdate()
                  }
                }}
              />
              <TextField
                hintText          = 'Organization'
                name              = 'organization'
                onChange          = {this.handleChangeState}
                value             = {this.state.updateObj.organization}
                errorText         = {this.state.errorText.organization}
                onKeyPress        = {(event) => {
                  if (event.key == 'Enter') {
                    event.preventDefault()
                    this.submitUserUpdate()
                  }
                }}
              />
            </div>
            <div>
              <RaisedButton
                label   = 'submit'
                style   = {{width: '20%', minWidth: '250px'}}
                onClick = {this.submitUserUpdate}
                secondary = {true}
              />
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
