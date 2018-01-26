import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbUserSettings from '../../DumbComponents/Main/DumbUserSettings.js'

class SmartUserSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbUserSettings
        />
      </div>
    )
  }
}

export default withRouter(SmartUserSettings)
