import React        from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes    from 'prop-types';

import SmartDocumentHeader  from './SmartDocumentStorage/SmartDocumentHeader.js';
import SmartDocumentMain    from './SmartDocumentStorage/SmartDocumentMain.js';

class SmartDocumentStorage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //This component should hold states that reflect filter choices which can
      //be passed down to DocumentMain to render meeting cards
      currentFolder: 'All Meetings',
      meetingNames : [
        'Code Review',
        'Milestones',
        'Product Design Session',
        'Pre-release checklist',
        'Crash analysis' ],

    };
    this.handleCurrentFolderChange  = this.handleCurrentFolderChange.bind(this)
    this.redirectToPath             = this.redirectToPath.bind(this)
  }

  handleCurrentFolderChange(event, value){
    this.setState({currentFolder: value});
    // console.log(this.state.currentFolder);
  }

  redirectToPath(urlPath) {
    this.props.history.push(urlPath)
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
      <div className='DocumentStorageWrapper'>
        <SmartDocumentHeader
          handleCurrentFolderChange     = {this.handleCurrentFolderChange}
          currentFolder                 = {this.state.currentFolder}
          redirectToPath                = {this.redirectToPath}
        />
        <SmartDocumentMain
          currentFolder = {this.state.currentFolder}
          />
      </div>
    );
  }
}

export default withRouter(SmartDocumentStorage)

//-----------------------------PROP TYPES---------------------------------------

SmartDocumentStorage.propTypes = {
  // userTokenObj: PropTypes.object.isRequired,
};
