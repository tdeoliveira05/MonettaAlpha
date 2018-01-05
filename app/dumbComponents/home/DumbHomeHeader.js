import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import nameLogo from '../../assets/images/nameLogo.png'

const DumbHomeHeader = ({handleSetDialogCall}) => (
  <div>
    <div className='Header'>
      <div className='HeaderBlock'>

        <img src={nameLogo}/>
        <div className='HeaderButtons'>
          <FlatButton primary={true} label='Login' onClick={() => handleSetDialogCall('login', true)}/>
          <RaisedButton secondary={true} style={{marginLeft:"1vw"}} labelColor='rgb(92, 167, 255)' label='Sign Up' onClick={() => handleSetDialogCall('signup', true)}/>
        </div>
      </div>
    </div>
  </div>
)

export default DumbHomeHeader;
