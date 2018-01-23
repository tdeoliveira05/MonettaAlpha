import React from 'react'
import DumbChooseMeeting from '../../../DumbComponents/Main/TeamMeeting/DumbChooseMeeting.js'
import ReusableSmartFeedback from '../../../Reusable/Smart/ReusableSmartFeedback.js'

export default class SmartChooseMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <DumbChooseMeeting
          handleIndexChange = {this.props.handleIndexChange}
        />
        <div style = {{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
          marginBottom: '20px'
        }}>
        </div>
      </div>
    )
  }
}
