import React from 'react'
import {withRouter} from 'react-router-dom'

const DumbMeetingTabChoice = ({
  history
}) => (
  <div className = 'MeetingTabChoiceWrapper'>
    <h1> What would you like to do? </h1>
    <div className = 'MeetingTabChoiceContent'>
      <button onClick = {() => history.push('/meeting/templates')}> Create or edit a meeting template </button>
      <button onClick = {() => history.push('/meeting/schedule')}> Schedule a meeting </button>
      <button onClick = {() => history.push('/meeting/standard')}> Host a standard meeting </button>
    </div>
  </div>
);


// To implement prop-types:
/*

import React        from 'react';
import PropTypes    from 'prop-types';

const DumbMeetingTabChoice = (props) => {

  let propName = props.propName;

  return (
    <div>

    </div>
  );
};

DumbMeetingTabChoice.propTypes = {
  propName:     PropTypes.type.isRequired,
};

*/

export default withRouter(DumbMeetingTabChoice)
