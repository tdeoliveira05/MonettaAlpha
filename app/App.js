/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import axios from 'axios'

import SmartHome from './SmartComponents/SmartHome.js'
import SmartMain from './SmartComponents/SmartMain.js'

export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      appLocation: 'home',
      userTokenObj: {}
    }
    /******************* REMOVE SEED DATA ABOVE AFTER TESTING *****************/

    this.submitUserTokenObj = this.submitUserTokenObj.bind(this)
	}

  submitUserTokenObj (userTokenObj) {
    this.setState(userTokenObj)
    this.setState({appLocation: 'app'})
  }

  render() {
    //---------------------------CONDITIONS-------------------------------------


    //----------------------------RETURN----------------------------------------
    switch(this.state.appLocation) {
      case 'home':
      return (
        <SmartHome
          submitUserTokenObj = {this.submitUserTokenObj}
        />
      )

      case 'app':
      return (
        <div>
          <SmartMain
            userTokenObj     = {this.state.userTokenObj}
          />
        </div>
      )
    }
  }
}

/*



*/
