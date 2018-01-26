import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbHelp from '../../DumbComponents/Main/DumbHelp.js'


class SmartHelp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbHelp
        />
      </div>
    )
  }
}

export default withRouter(SmartHelp)
