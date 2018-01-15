import React from 'react'
import Dialog from 'material-ui/Dialog'

import DumbHomeMain from '../DumbComponents/Home/DumbHomeMain.js'
import DumbHomeHeader from '../DumbComponents/Home/DumbHomeHeader.js'
import DumbHomeFooter from '../DumbComponents/Home/DumbHomeFooter.js'
import DumbHomeLogin from '../DumbComponents/Home/DumbHomeLogin.js'
import DumbHomeSignup from '../DumbComponents/Home/DumbHomeSignup.js'
import DumbHomeAlpha from '../DumbComponents/Home/DumbHomeAlpha.js'
import DumbHomePrivacyAndTerms from '../DumbComponents/Home/DumbHomePrivacyAndTerms.js'

import ReusableDumbDialog from '../Reusable/Dumb/ReusableDumbDialog.js'

export default class SmartHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: {
        username: '',
        password: '',
        codeUsed: '',
        firstName: '',
        lastName: '',
        jobPosition: '',
        organization: '',
        referenceNotes: ''
      },
      tempErrors: {},
      dialogToggle: false,
      dialogComponentType: 'login'
    }

    this.dialogToggleFunction   = this.dialogToggleFunction.bind(this)
    this.handleSetDialogCall    = this.handleSetDialogCall.bind(this)
    this.handleSubmit           = this.handleSubmit.bind(this)
    this.handleOnTempChange     = this.handleOnTempChange.bind(this)
  }

  dialogToggleFunction () {
    this.setState({dialogToggle: !this.state.dialogToggle})
  }

  handleSetDialogCall (target, activate) {
    this.setState({dialogComponentType: target})
    if (activate) this.dialogToggleFunction()
  }

  handleSubmit (submitType) {
    var data = this.state.temp

    switch(this.state.dialogComponentType) {
      case 'login':
        //this.props.handleLoginRequest(data)
        this.dialogToggleFunction()
        break

      case 'signup':
        //this.props.handleSignupRequest(data)
        this.dialogToggleFunction()
        break

      case 'alpha':
        //this.props.handleAlphaRequest(data)
        this.dialogToggleFunction()
        break
    }
  }

  handleOnTempChange(event) {
    // The following three lines of code use immutability helpers---------------
    /*
    This is to allow this function to ADD to the this.state.temp obj by copying
    it into a variable, modifying the variable, overwriting the old temp object
    with a new (modified) temp object. If this were not done, every time the user
    switched from filling out one text field to the other, the previous text field
    value would be deleted and this.state.temp would be assigned to the new value

    The alternative incorrect function can be seen by replacing the following
    three lines with the usual single line function call for an onChange handler:

    this.setState({temp: {[event.target.name]: event.target.value}})
    */
    var newTempObj = this.state.temp // a new object of this.state.temp is created
    newTempObj[event.target.name] = event.target.value // new object is modified
    this.setState(newTempObj) // overwrites the old this.state.temp obj with the new object
    //--------------------------------------------------------------------------
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    switch(this.state.dialogComponentType) {
      case 'login':
        var dialogComponent = (
          <DumbHomeLogin
            username            = {this.state.temp.username}
            password            = {this.state.temp.password}
            tempErrors          = {this.state.tempErrors}
            handleOnTempChange  = {this.handleOnTempChange}
            handleSubmit        = {this.handleSubmit}
            handleSetDialogCall = {this.handleSetDialogCall}
            />
        )
        break

      case 'signup':
        var dialogComponent = (
          <DumbHomeSignup
            username            = {this.state.temp.username}
            password            = {this.state.temp.password}
            codeUsed            = {this.state.temp.codeUsed}
            tempErrors          = {this.state.tempErrors}
            handleSubmit        = {this.handleSubmit}
            handleOnTempChange  = {this.handleOnTempChange}
            handleSetDialogCall = {this.handleSetDialogCall}
            />
        )
        break

      case 'alpha':
        var dialogComponent = (
          <DumbHomeAlpha
            username            = {this.state.temp.username}
            firstName           = {this.state.temp.firstName}
            lastName            = {this.state.temp.lastName}
            jobPosition         = {this.state.temp.jobPosition}
            organization        = {this.state.temp.organization}
            referenceNotes      = {this.state.temp.referenceNotes}
            handleOnTempChange  = {this.handleOnTempChange}
            handleSubmit        = {this.handleSubmit}
            />
        )
         break

       case 'privacyTerms':
        var dialogComponent = (
          <DumbHomePrivacyAndTerms
            />
        )
        break
    }

    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <div>
          <DumbHomeHeader
            handleSetDialogCall  = {this.handleSetDialogCall}
            />
          <DumbHomeMain
            username             = {this.state.temp.username}
            handleSetDialogCall  = {this.handleSetDialogCall}
            handleOnTempChange   = {this.handleOnTempChange}
            />
          <DumbHomeFooter
            handleSetDialogCall  = {this.handleSetDialogCall}
            />
        </div>
        <div>
          <ReusableDumbDialog
            dialogToggle         = {this.state.dialogToggle}
            dialogToggleFunction = {this.dialogToggleFunction}
            dialogComponent      = {dialogComponent}
            />
        </div>
      </div>
    )
  }
}

/*


*/
