import React from 'react'
import {withRouter} from 'react-router-dom'

import DumbProductivityData from '../../DumbComponents/Main/DumbProductivityData.js'

class SmartProductivityData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbProductivityData
        />
      </div>
    )
  }
}

export default withRouter(SmartProductivityData)
