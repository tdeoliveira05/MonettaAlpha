/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

import SmartHome from './SmartComponents/SmartHome.js'
import SmartMain from './SmartComponents/SmartMain.js'
import SmartAdmin from './SmartComponents/SmartAdmin.js'

//------------------------- Initialize web socket ----------------------------//

var socketInit

//----------------------------------------------------------------------------//

class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      admin: false,
      appLocation: 'home',
      userTokenObj: {
        username: localStorage.username,
        fullName: localStorage.fullName,
        token: localStorage.token
      },
      isLoggedIn: false,
      userSettings: {
        quickMeeting: {
          title: 'Quick Meeting',
          participants: [{
            fullName: '',
            email: '',
            guest: true
          }],
          location: 'HQ',
          timeElapsed: {
            expectedDuration: 900000,
            formattedExpectedDuration: '15 mins'
          }
        }
      }
    }
    /******************* REMOVE SEED DATA ABOVE AFTER TESTING *****************/

    this.submitUserTokenObj     = this.submitUserTokenObj.bind(this)
    this.changeAppLocation      = this.changeAppLocation.bind(this)
    this.authenticateMe         = this.authenticateMe.bind(this)
    this.signOut                = this.signOut.bind(this)
    this.initializeUserSettings = this.initializeUserSettings.bind(this)
    this.initializeWebSocket    = this.initializeWebSocket.bind(this)
    this.checkIfAdmin           = this.checkIfAdmin.bind(this)
    this.resetLocalStorage      = this.resetLocalStorage.bind(this)
	}

  componentWillReceiveProps () {
    console.log('component will receive props')

  }

  componentWillMount () {
    if (localStorage.access_token && this.state.isLoggedIn === false) {
      console.log('authenticating...')
      this.authenticateMe(localStorage.access_token)
    } else if (!localStorage.access_token) {
      localStorage.removeItem('username')
      localStorage.removeItem('fullName')
    }
  }

  authenticateMe (tokenVal) {
    axios.post('http://localhost:8080/authenticateMe', {
      token: tokenVal
    })
    .then((successObj) => {
      if (!successObj.data.success) {
        console.log('user not identified.')
        this.setState({isLoggedIn: false})
        this.resetLocalStorage()
      } else {
        console.log('Welcome back!')
        localStorage.username = successObj.data.username
        localStorage.fullName = successObj.data.fullName
        this.initializeUserSettings()
        this.initializeWebSocket()
        this.setState({isLoggedIn: true})
        if (successObj.data.admin) this.setState({admin: true})
      }
    })
    .catch((error) => {
      console.log(error)
    })

    return this.state.isLoggedIn
  }

  initializeUserSettings () {
      const self = this
      axios.post('http://localhost:8080/secure/userDocument/getSettings')
      .then((resultObj) => {
        if (resultObj.data.settings) {
          console.log('User settings successfully loaded')
          this.setState({userSettings: resultObj.data.settings})
        } else {
          console.log('no user settings were found')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  initializeWebSocket () {
    console.log('initializing operations...')
    socketInit = io('http://localhost:8080')
  }

  submitUserTokenObj (userTokenObjVal, admin) {
    localStorage.access_token    = 'bearer ' + userTokenObjVal.token
    localStorage.username        = userTokenObjVal.username
    localStorage.fullName        = userTokenObjVal.fullName


    axios.defaults.headers.common['access_token'] = localStorage.access_token
    this.initializeWebSocket()


    if (admin) {
      this.setState({appLocation: 'admin', admin: true})
    } else {
      this.setState({appLocation: 'app'})
    }
  }

  changeAppLocation (direction) {
    this.setState({appLocation: direction})
  }

  signOut () {
    this.resetLocalStorage()
    this.setState({appLocation: 'home'})
  }

  resetLocalStorage () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('username')
    localStorage.removeItem('fullName')
    this.setState({isLoggedIn: false, admin: false})
  }

  checkIfAdmin () {
    if (this.state.admin) {
      return (
        <div style = {{width: '100%', display: 'flex', height: '40px'}}>
          <button onClick = {() => this.changeAppLocation('app')} style = {{width: '50%', height: '100%', backgroundColor: 'gray', color: 'white', fontWeight: 'bold', marginRight: '1px'}}> User view </button>
          <button onClick = {() => this.changeAppLocation('admin')} style = {{width: '50%', height: '100%', backgroundColor: 'gray', color: 'white', fontWeight: 'bold', marginLeft: '1px'}}> Admin Panel </button>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }



  render() {
    //---------------------------CONDITIONS-------------------------------------

    console.log(this.props)

    var socket
    if (socketInit) socket = socketInit
    var adminControls = this.checkIfAdmin()
    //----------------------------RETURN----------------------------------------
    switch(this.state.appLocation) {
      case 'home':
      return (
        <SmartHome
          submitUserTokenObj   = {this.submitUserTokenObj}
          changeAppLocation    = {this.changeAppLocation}
          isLoggedIn           = {this.state.isLoggedIn}
          admin                = {this.state.admin}
          resetLocalStorage    = {this.resetLocalStorage}
          signOut              = {this.signOut}
        />
      )

      case 'app':
      return (
        <div>
          {adminControls}
          <SmartMain
            userTokenObj       = {this.state.userTokenObj}
            submitUserTokenObj = {this.submitUserTokenObj}
            changeAppLocation  = {this.changeAppLocation}
            signOut            = {this.signOut}
            userSettings       = {this.state.userSettings}
            socket             = {socket}
            admin              = {this.state.admin}
          />
        </div>
      )

      case 'admin':
        return (
          <div>
            {adminControls}
            <SmartAdmin
              userTokenObj       = {this.state.userTokenObj}
              submitUserTokenObj = {this.submitUserTokenObj}
              changeAppLocation  = {this.changeAppLocation}
              signOut            = {this.signOut}
              userSettings       = {this.state.userSettings}
              socket             = {socket}
              admin              = {this.state.admin}
            />
          </div>
        )
    }
  }
}

export default withRouter(App)

/*


*/
