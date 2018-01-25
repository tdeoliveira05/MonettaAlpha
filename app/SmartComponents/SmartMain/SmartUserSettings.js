import React from 'react'
import DumbUserSettings from '../../DumbComponents/Main/DumbUserSettings.js'

export default class SmartUserSettings extends React.Component {
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
