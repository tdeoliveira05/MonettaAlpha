import React from 'react'
import DumbProductivityData from '../../DumbComponents/Main/DumbProductivityData.js'

export default class SmartProductivityData extends React.Component {
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
