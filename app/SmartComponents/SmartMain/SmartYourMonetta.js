import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes    from 'prop-types';

import DumbYourMonetta from '../../DumbComponents/Main/DumbYourMonetta.js';

class SmartYourMonetta extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //---------------------------RETURN-----------------------------------------
    return(
      <div className = "YourMonettaWrapper">
        <DumbYourMonetta />
      </div>
    )
  }
}

export default withRouter(SmartYourMonetta)
//-------------------------------EXPECTED PROP TYPES----------------------------
SmartYourMonetta.propTypes = {
  propName: PropTypes.type,
  // Example: currentFolder: PropTypes.string.isRequired,
};
