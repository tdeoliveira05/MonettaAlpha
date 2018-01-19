import React from 'react'

import SmartHome from './SmartComponents/SmartHome.js'
import SmartMain from './SmartComponents/SmartMain.js'

export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      appLocation: 'app',

      userTokenObj: {
        id: '5a6142517e790da03688e448',
        username: 'sunny.p.panchal@gmail.com',
        fullName: 'Sunny Panchal',
        token: '7gah3kh47sdfg98fdg'
      }
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
