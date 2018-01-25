import React from 'react'
import DumbHelp from '../../DumbComponents/Main/DumbHelp.js'


export default class SmartHelp extends React.Component {
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
