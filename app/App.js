import React from 'react'
import axios from 'axios'

import SmartHome from './SmartComponents/SmartHome.js'
import SmartMain from './SmartComponents/SmartMain.js'

export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      appLocation: 'app',
      userTokenObj: {}
    }
    /******************* REMOVE SEED DATA ABOVE AFTER TESTING *****************/

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
    const self = this
    axios.post('http://monettatech.com/alphaRequest', alphaData)
    .then((response) => {
      console.log('server responded')
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {

    switch(this.state.appLocation) {
      case 'home':
      return (
        <SmartHome
          userTokenObj          = {this.state.userTokenObj}
          handleLoginRequest    = {this.handleLoginRequest}
          handleSignupRequest   = {this.handleSignupRequest}
          handleAlphaRequest    = {this.handleAlphaRequest}
        />
      )

      case 'app':
      return (
        <div>
          <SmartMain
            userTokenObj            = {this.state.userTokenObj}
          />
        </div>
      )
    }
  }
}

/*



*/
