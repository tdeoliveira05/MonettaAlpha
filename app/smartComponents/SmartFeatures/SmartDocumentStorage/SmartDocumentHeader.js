import React        from 'react';
import PropTypes    from 'prop-types';

import DumbDocumentToolbar    from '../../../dumbComponents/DocumentStorage/DumbDocumentToolbar.js';

export default class SmartDocumentHeader extends React.Component {
  constructor (props) {
    super(props);
    // See propTypes at the bottom of the code for expected props
  }


  render() {
  //---------------------------CONDITIONS-------------------------------------

  //----------------------------RETURN----------------------------------------
    return(
      <div className='DocumentStorageHeader'>
        <DumbDocumentToolbar
          currentFolder={this.props.currentFolder}
          onCurrentFolderChange={this.props.handleCurrentFolderChange} />

      </div>
    );
  }
}
//--------------------------EXPECTED PROP TYPES--------------------------------
SmartDocumentHeader.propTypes = {
  handleCurrentFolderChange:    PropTypes.func.isRequired,
  currentFolder:                PropTypes.string.isRequired,
  meetingNames:                 PropTypes.array,
};
