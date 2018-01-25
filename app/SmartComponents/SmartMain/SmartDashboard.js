import React from 'react'
import DumbDashboard from '../../DumbComponents/Main/DumbDashboard.js'

export default class SmartDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbDashboard
        />
      </div>
    )
  }
}
