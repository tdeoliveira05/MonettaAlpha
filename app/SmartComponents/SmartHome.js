/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import {withRouter} from 'react-router-dom'
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

class SmartHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: {
        username: '',
        password: '',
        confirmPassword: '',
        codeUsed: '',
        firstName: '',
        lastName: '',
        jobPosition: '',
        organization: '',
        referenceNotes: ''
      },
      alphaErrors: {},
      signupErrors: {},
      loginErrors: {},
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

    this.checkAlphaErrors     = this.checkAlphaErrors.bind(this)
  }

  handleLoginRequest (loginData) {
    console.log('login')
    const self = this
    axios.post('http://localhost:8080/request/login', loginData)
    .then((tokenResponse) => {
      if (tokenResponse.data.errors) this.setState({loginErrors: {email: tokenResponse.data.usernameError, password: tokenResponse.data.passwordError}})
      console.log(tokenResponse.data)
      if (tokenResponse.data.token) {
        this.props.submitUserTokenObj(tokenResponse.data, tokenResponse.data.admin)
      } else {
        console.log('no token object returned')
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleSignupRequest (signupData) {
    console.log('signup')
    const self = this
    axios.post('http://localhost:8080/request/signup', signupData)
    .then((tokenResponse) => {
      if (tokenResponse.data.errors) this.setState({signupErrors: {email: tokenResponse.data.usernameError, password: tokenResponse.data.passwordError, code: tokenResponse.data.codeError}})
      tokenResponse.data.token ? this.props.submitUserTokenObj(tokenResponse.data) : console.log('no token object returned')
    })
    .catch((error) => {
      console.log('[SmartHome.js]  - handleSignupRequest() ' + error)
    })
  }

  handleAlphaRequest (alphaData) {
    console.log('alpha accessed')
    const self = this
    axios.post('http://localhost:8080/request/alpha', alphaData)
    .then((response) => {
      this.dialogToggleFunction()
      alert('We sent you an email!')
    })
    .catch((error) => {
      console.log('server gave error')
      console.log(error)
      alert('Well that was not supposed to happen... Please send us a message with the following server error: ' + error)
    })
  }

  checkAlphaErrors () {
    var alphaErrors = {}

    // First name errors
    if (this.state.temp.firstName === '') alphaErrors.firstName = 'required'

    // Last name errors
    if (this.state.temp.lastName === '') alphaErrors.lastName = 'required'

    // Email (username) errors
    if (this.state.temp === '' || !this.state.temp.username.includes('@') || !this.state.temp.username.includes('.')) alphaErrors.email = 'A valid email is required'

    // Job position errors
    if (this.state.temp.jobPosition === '') alphaErrors.jobPosition = 'required'

    // Organization errors
    if (this.state.temp.organization === '') alphaErrors.organization = 'required'

    // If no client errors found submit
    if (Object.keys(alphaErrors).length === 0) {
      this.handleAlphaRequest(this.state.temp)
    } else {
      this.setState({alphaErrors: alphaErrors})
    }
  }

  checkSignupErrors () {
    var signupErrors = {}

    // Email (username) errors
    if (this.state.temp.username === '' || !this.state.temp.username.includes('@') || !this.state.temp.username.includes('.')) signupErrors.email = 'A valid email is required'

    // Password does not match confirm password
    if (this.state.temp.password !== this.state.temp.confirmPassword) signupErrors.password = 'Passwords do not match'

    // A code is present
    if (this.state.temp.codeUsed === '') signupErrors.code = 'A code is needed to signup'

    // If no client errors found submit
    if (Object.keys(signupErrors).length === 0) {
      this.handleSignupRequest(this.state.temp)
    } else {
      this.setState({signupErrors: signupErrors})
    }
  }

  checkLoginErrors () {
    var loginErrors = {}
    // no username present
    if (this.state.temp.username === '' || !this.state.temp.username.includes('@') || !this.state.temp.username.includes('.')) loginErrors.email = 'A valid email is required'

    // no password present
    if (this.state.temp.password === '') loginErrors.password = 'A password is required'

    // If no client errors found submit
    if (Object.keys(loginErrors).length === 0) {
      this.handleLoginRequest(this.state.temp)
    } else {
      this.setState({loginErrors: loginErrors})
    }
  }


  dialogToggleFunction () {
    if (this.state.dialogToggle) this.resetTemp()                               // if dialog is closing, reset the temp fields
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

  handleSetDialogCall (target, activate) {
    this.setState({dialogComponentType: target})

    // if they are already authenticated, let them in automatically
    if (activate && target === 'login' && this.props.isLoggedIn === true && !this.props.admin) {
      // if the user is not admin give thema regular entry
      console.log('user is already logged in')
      this.props.changeAppLocation('app')
    } else if (activate && target === 'login' && this.props.isLoggedIn === true && this.props.admin) {
      // if the user is an admin, change app location to admin
      console.log('Welcome back admin')
      this.props.changeAppLocation('app')
    } else if (activate && target === 'signup') {
      console.log('reset')
      this.props.signOut()
      this.dialogToggleFunction()
    } else if (activate) {
      this.props.signOut()
      this.dialogToggleFunction()
    }
  }

  handleSubmit (submitType) {
    switch(this.state.dialogComponentType) {
      case 'login':
        this.checkLoginErrors()
        break

      case 'signup':
        this.checkSignupErrors()
        break

      case 'alpha':
        this.checkAlphaErrors()
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
            loginErrors         = {this.state.loginErrors}
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
            confirmPassword     = {this.state.temp.confirmPassword}
            signupErrors        = {this.state.signupErrors}
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
            alphaErrors         = {this.state.alphaErrors}
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

export default withRouter(SmartHome)

/*


*/
