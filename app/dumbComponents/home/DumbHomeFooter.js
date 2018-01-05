import React from 'react'
import FlatButton from 'material-ui/FlatButton'

import nameLogo from '../../assets/images/nameLogo.png'


const DumbHomeFooter = ({handleSetDialogCall}) => (
  <div className='Footer'>
    <div className='FooterBlock'>

      <div className='Logo'>
        <img className='Logo' src={nameLogo} />
      </div>

      <div className='ContactInfo'>
        <h2> Contact Us </h2>
        <p>team@monettatech.com</p>
        <p>945 Princess St., K7L3N6</p>
        <p>Kingston, ON</p>
        <p>Canada</p>
        <br></br>
      </div>

      <div className='Button'>
        <FlatButton label='Privacy & terms' primary={true} onClick={() => handleSetDialogCall('privacyTerms', true)}/>
      </div>


    </div>
  </div>
)

export default DumbHomeFooter;
