import React from 'react'
import {withRouter} from 'react-router-dom'

const DumbMeetingTabChoice = ({
  history
}) => (
  <div>

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
