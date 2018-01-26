import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbDashboard from '../../DumbComponents/Main/DumbDashboard.js'

class SmartDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.redirectToPath = this.redirectToPath.bind(this)
  }

  redirectToPath(urlPath) {
    this.props.history.push(urlPath)
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbDashboard
          redirectToPath = {this.redirectToPath}
        />
      </div>
    )
  }
}

export default withRouter(SmartDashboard)
