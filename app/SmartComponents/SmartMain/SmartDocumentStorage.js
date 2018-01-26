import React from 'react'
import {withRouter} from 'react-router-dom'

import SmartDocumentHeader  from './SmartDocumentStorage/SmartDocumentHeader.js';
import SmartDocumentMain    from './SmartDocumentStorage/SmartDocumentMain.js';

class SmartDocumentStorage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //This component should hold states that reflect filter choices which can
      //be passed down to DocumentMain to render meeting cards
    };
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
      <div className='DocumentStorageWrapper'>
        <SmartDocumentHeader />
        <SmartDocumentMain />
      </div>
    );
  }
}

export default withRouter(SmartDocumentStorage)
