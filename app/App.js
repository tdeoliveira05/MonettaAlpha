import React from 'react'

import SmartHome from './SmartComponents/SmartHome.js'
import SmartMain from './SmartComponents/SmartMain.js'

export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      appLocation: 'app',

      userTokenObj: {
        username: 'sunny.p.panchal@gmail.com',
        fullName: 'Sunny Panchal',
        token:    'sdfas9d8fsa9df8'
      }
    }
    /******************* REMOVE SEED DATA ABOVE AFTER TESTING *****************/

    this.submitUserTokenObj = this.submitUserTokenObj.bind(this)
    this.changeAppLocation  = this.changeAppLocation.bind(this)
	}

  submitUserTokenObj (userTokenObjVal) {
    this.setState({userTokenObj: userTokenObjVal, appLocation: 'app'})
  }

  changeAppLocation (direction) {
    this.setState({appLocation: direction})
  }

  render() {
    console.log(this.props)
    //---------------------------CONDITIONS-------------------------------------

    console.log(this.state)
    //----------------------------RETURN----------------------------------------
    switch(this.state.appLocation) {
      case 'home':
      return (
        <SmartHome
          submitUserTokenObj   = {this.submitUserTokenObj}
          changeAppLocation    = {this.changeAppLocation}
        />
      )

      case 'app':
      return (
        <div>
          <SmartMain
            userTokenObj       = {this.state.userTokenObj}
            changeAppLocation  = {this.changeAppLocation}
          />
        </div>
      )
    }
  }
}

/*



*/
