import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes    from 'prop-types';

import DumbYourVoice from '../../DumbComponents/Main/DumbYourVoice.js';

class SmartYourVoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //---------------------------RETURN-----------------------------------------
    return(
      <div>
        <DumbYourVoice />
      </div>
    )
  }
}

export default withRouter(SmartYourVoice)
//-------------------------------EXPECTED PROP TYPES----------------------------
SmartYourVoice.propTypes = {
  propName: PropTypes.type,
  // Example: currentFolder: PropTypes.string.isRequired,
};
