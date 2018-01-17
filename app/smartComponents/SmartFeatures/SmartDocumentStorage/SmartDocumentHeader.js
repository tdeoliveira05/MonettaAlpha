import React from 'react';

import DumbDocumentHeader from '../../../DumbComponents/DocumentStorage/DumbDocumentHeader.js';

// Material-ui elements used in SmartDocumentHeader
import RaisedButton from 'material-ui/RaisedButton';
import Paper        from 'material-ui/Paper';

export default class SmartDocumentHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return(
      <div>
        <DumbDocumentHeader/>
      </div>
    );
  }
}

// SmartDocumentHeader.proptypes = {
// };
