import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes    from 'prop-types';

const DumbYourVoice = ({
  
}) => {

  // let propName = props.propName;

  return (
    <div className = "YourVoiceWrapper">
      <div className = "YourMonettaContent">
        <div className = 'YourMonettaHeader'>
          <h1> What features would you like to see next? </h1>
        </div>
      </div>
    </div>
  );
};

DumbYourVoice.propTypes = {
  // propName:     PropTypes.type.isRequired,
};

export default withRouter(DumbYourVoice)
