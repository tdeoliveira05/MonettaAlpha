/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import Dialog from 'material-ui/Dialog'
import axios from 'axios'

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
      errorText: {
        username: '',
        password: '',
        codeUsed: '',
        firstName: '',
        lastName: '',
        jobPosition: '',
        organization: '',
        referenceNotes: ''
      },
      dialogToggle: false,
      dialogComponentType: 'alpha'
    }

    this.dialogToggleFunction   = this.dialogToggleFunction.bind(this)
    this.handleSetDialogCall    = this.handleSetDialogCall.bind(this)
    this.handleSubmit           = this.handleSubmit.bind(this)
    this.handleOnTempChange     = this.handleOnTempChange.bind(this)
    this.resetTemp              = this.resetTemp.bind(this)

    this.handleLoginRequest   = this.handleLoginRequest.bind(this)
    this.handleSignupRequest  = this.handleSignupRequest.bind(this)
    this.handleAlphaRequest   = this.handleAlphaRequest.bind(this)
  }

  handleLoginRequest (loginData) {
    console.log('dev restrictions')
    /*
    const self = this
    axios.post('http://localhost:3000/request/login', loginData)
    .then((tokenResponse) => {
      tokenResponse.data.token ? this.props.submitUserTokenObj(tokenResponse.data) : console.log('no token object returned')
    })
    .catch((error) => {
      console.log('[App.js] - handleLoginRequest() ' + error)
    })
    */
  }

  handleSignupRequest (signupData) {
    console.log('dev restrictions')
    /*
    const self = this
    axios.post('http://localhost:3000/request/signup', signupData)
    .then((tokenResponse) => {
      tokenResponse.data.token ? this.props.submitUserTokenObj(tokenResponse.data) : console.log('no token object returned')
    })
    .catch((error) => {
      console.log('[SmartHome.js]  - handleSignupRequest() ' + error)
    })
    */
  }

  handleAlphaRequest (alphaData) {
    console.log('alpha accessed')
    const self = this
    axios.post('http://localhost:8080/request/alpha', alphaData)
    .then((response) => {
      console.log('server responded')
      console.log(response)
      alert('We sent you an email!')
    })
    .catch((error) => {
      console.log('server gave error')
      console.log(error)
      alert('Well that was not supposed to happen... Please send us a message with the following server error: ' + error)
    })
  }

  dialogToggleFunction () {
    this.setState({dialogToggle: !this.state.dialogToggle})
  }

  resetTemp () {
    this.setState({
      temp: {
        username: '',
        password: '',
        codeUsed: '',
        firstName: '',
        lastName: '',
        jobPosition: '',
        organization: '',
        referenceNotes: ''
      }
    })
  }

  checkForErrors () {
    var errorText = this.state.errorText

    if (temp.username === '') {
    }
  }

  handleSetDialogCall (target, activate) {
    this.setState({dialogComponentType: target})
    if (activate) this.dialogToggleFunction()
  }

  handleSubmit (submitType) {
    var data = this.state.temp


    switch(this.state.dialogComponentType) {
      case 'login':
        //this.handleLoginRequest(data)
        break

      case 'signup':
        //this.handleSignupRequest(data)
        break

      case 'alpha':
        this.handleAlphaRequest(data)
        this.resetTemp()
        break

      case 'soon':
        console.log('coming soon!')
        break
    }
  }

  handleOnTempChange(event) {
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

       case 'soon':
       var dialogComponent = (
         <div>
          <h1> Coming soon! </h1>
        </div>
       )

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
