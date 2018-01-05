import React from 'react'
import axios from 'axios'

import SmartHome from './smartComponents/SmartHome.js'
import SmartMain from './smartComponents/SmartMain.js'

export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      appLocation: 'app',
      tokenObj: {}
    }

    this.handleLoginRequest   = this.handleLoginRequest.bind(this)
    this.handleSignupRequest  = this.handleSignupRequest.bind(this)
    this.handleAlphaRequest   = this.handleAlphaRequest.bind(this)
	}

  handleLoginRequest (loginData) {
    const self = this
    axios.post('http://localhost:3000/loginRequest', loginData)
    .then((tokenResponse) => {
      tokenResponse.data.token ? this.setState({tokenObj: tokenResponse.data, appLocation: 'app'}) : console.log('no token object returned')
    })
    .catch((error) => {
      console.log('[App.js] - handleLoginRequest() ' + error)
    })
  }

  handleSignupRequest (signupData) {
    const self = this
    axios.post('http://localhost:3000/signupRequest', signupData)
    .then((tokenResponse) => {
      tokenResponse.data.token ? this.setState({tokenObj: tokenResponse.data, appLocation: 'app'}) : console.log('no token object returned')
    })
    .catch((error) => {
      console.log('[App.js]  - handleSignupRequest() ' + error)
    })
  }

  handleAlphaRequest (alphaData) {
    console.log('in app.js - alpha, ' + alphaData)
  }

  render() {

    switch(this.state.appLocation) {
      case 'home':
      return (
        <SmartHome
          tokenObj              = {this.state.tokenObj}
          handleLoginRequest    = {this.handleLoginRequest}
          handleSignupRequest   = {this.handleSignupRequest}
          handleAlphaRequest    = {this.handleAlphaRequest}
        />
      )

      case 'app':
      return (
        <div>
          <SmartMain
            tokenObj            = {this.state.tokenObj}
          />
        </div>
      )
    }
  }
}

/*



*/
