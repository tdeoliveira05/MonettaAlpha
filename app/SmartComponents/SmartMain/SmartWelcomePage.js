import React from 'react'

import DumbWelcomePage from '../../DumbComponents/Main/DumbWelcomePage'

export default class SmartWelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      <div>
        <DumbWelcomePage
          firstName           = {this.state.updateObj.firstName}
          firstNameError      = {this.state.errorText.firstName}
          lastName            = {this.state.updateObj.lastName}
          lastNameError       = {this.state.errorText.lastName}
          jobPosition         = {this.state.updateObj.jobPosition}
          jobPositionError    = {this.state.errorText.jobPosition}
          organization        = {this.state.updateObj.organization}
          organizationError   = {this.state.errorText.organization}
          handleChangeState   = {this.handleChangeState}
          submitUserUpdate    = {this.submitUserUpdate}

        />
      </div>
    )
  }
}
