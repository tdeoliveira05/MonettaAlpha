import React        from 'react';
import PropTypes    from 'prop-types';

import DumbDocumentToolbar    from '../../../DumbComponents/Main/DocumentStorage/DumbDocumentToolbar.js';

export default class SmartDocumentHeader extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
  //---------------------------CONDITIONS-------------------------------------

  //----------------------------RETURN----------------------------------------
    return(
      <div className='DocumentStorageHeader'>
        <DumbDocumentToolbar
          currentFolder           = {this.props.currentFolder}
          onCurrentFolderChange   = {this.props.handleCurrentFolderChange}
          redirectToPath          = {this.props.redirectToPath}
          />

      </div>
    );
  }
}
//--------------------------EXPECTED PROP TYPES--------------------------------
SmartDocumentHeader.propTypes = {
  handleCurrentFolderChange:    PropTypes.func.isRequired,
  currentFolder:                PropTypes.string.isRequired,
  meetingNames:                 PropTypes.array,
  redirectToPath:               PropTypes.func.isRequired,
};
