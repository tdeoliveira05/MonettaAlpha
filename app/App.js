/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import SmartHome from './SmartComponents/SmartHome.js'
import SmartMain from './SmartComponents/SmartMain.js'
import SmartAdmin from './SmartComponents/SmartAdmin.js'
import config from './clientConfig/defaults.json'

//----------------------------------------------------------------------------//

class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      admin: false,
      appLocation: 'home',
      userTokenObj: {
        username: localStorage.username,
        fullName: localStorage.fullName
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
    this.authenticate           = this.authenticate.bind(this)
    this.signOut                = this.signOut.bind(this)
    this.initializeUserSettings = this.initializeUserSettings.bind(this)
    this.initializeWebSocket    = this.initializeWebSocket.bind(this)
    this.checkIfAdmin           = this.checkIfAdmin.bind(this)
    this.resetLocalStorage      = this.resetLocalStorage.bind(this)

	}

  componentWillMount () {
    if (Cookies.get('access_token') && this.state.isLoggedIn === false) {
      console.log('authenticating...')

      // run first authentication http route
      this.authenticate()



    } else if (!Cookies.get('access_token')) {
      // reset local storage of erroneous information
      this.resetLocalStorage()

    }
  }

  authenticate () {
    const self = this

    // send initial authentication HTTP route to open web socket
    axios.post(config.serverLocation + '/authenticate')
    .then((successObj) => {
      if (!successObj.data.success) {
        // null out their ability to log in with a single click
        this.setState({isLoggedIn: false})

        // reset localStorage of username and fullname
        this.resetLocalStorage()

      } else {
        // refresh local storage in case of any changes
        localStorage.username = successObj.data.username
        localStorage.fullName = successObj.data.fullName
        
        //Open an authenticated connection to the web socket (hadnshake will take place)
        this.initializeWebSocket()

        // Let the user in without having to log in
        this.setState({isLoggedIn: true})

        // enter admin flag into state
        if (successObj.data.admin) this.setState({admin: true})
      }
    })
    .catch((error) => {console.log(error)})
    return this.state.isLoggedIn
  }

  initializeUserSettings () {
      const self = this

      socket.emit('/secure/userDocument/getSettings')

      socket.on('response/secure/userDocument/getSettings', function (data) {
        if (data.settings) {
          console.log('User settings successfully loaded')
          self.setState({userSettings: data.settings})
        } else {
          console.log('no user settings were found')
        }
      })
  }

  initializeWebSocket () {
    console.log('initializing operations...')
    socket = io(config.serverLocation)
    socket.on('errorCustom', function (error) {
      console.log(error || 'no error message sent but error event triggered in client')
    })
    this.initializeUserSettings()
  }

  submitUserTokenObj (userTokenObjVal, admin) {
    Cookies.set('access_token', 'bearer ' + userTokenObjVal.token)

    localStorage.username = userTokenObjVal.username
    localStorage.fullName = userTokenObjVal.fullName

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
    Cookies.remove('access_token')
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
            admin              = {this.state.admin}
            appLocation        = {this.state.appLocation}
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
              admin              = {this.state.admin}
            />
          </div>
        )
    }
  }
}

export default withRouter(App)
