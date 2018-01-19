import React from 'react'

import SmartHome from './SmartComponents/SmartHome.js'
import SmartMain from './SmartComponents/SmartMain.js'

export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      appLocation: 'app',
      userTokenObj: {
        id: '5a61409107c40326400fcc17',       //the actual id of my user doc
        username: 'thiago1@gmail.com',        //the actual username of my user doc
        fullName: 'Thiago De Oliveira',       // put whatever here, im still working on it
        token: 'sdgerhaet'                    // put whatever here, this will only be important when we actually deploy
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
