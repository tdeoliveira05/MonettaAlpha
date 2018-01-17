import React from 'react';

import SmartDocumentHeader  from './SmartDocumentStorage/SmartDocumentHeader.js';
import SmartDocumentMain    from './SmartDocumentStorage/SmartDocumentMain.js';

export default class SmartDocumentStorage extends React.Component {
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
