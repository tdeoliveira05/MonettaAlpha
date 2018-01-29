import React from 'react'
import {withRouter} from 'react-router-dom'

const CLASS_NAME = ({}) => (
  <div>

  </div>
);

export default CLASS_NAME


// To implement prop-types:
/*

import React        from 'react';
import PropTypes    from 'prop-types';

const CLASS_NAME = (props) => {

  let propName = props.propName;

  return (
    <div>

    </div>
  );
};

CLASS_NAME.propTypes = {
  propName:     PropTypes.type.isRequired,
};

*/

export default withRouter(CLASS_NAME)
