import React        from 'react';
import PropTypes    from 'prop-types';

import SmartDocumentHeader  from './SmartDocumentStorage/SmartDocumentHeader.js';
import SmartDocumentMain    from './SmartDocumentStorage/SmartDocumentMain.js';

export default class SmartDocumentStorage extends React.Component {
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
    this.handleCurrentFolderChange = this.handleCurrentFolderChange.bind(this)
  }

  handleCurrentFolderChange(event, value){
    this.setState({currentFolder: value});
    // console.log(this.state.currentFolder);
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------

    //----------------------------RETURN----------------------------------------
    return(
      <div className='DocumentStorageWrapper'>
        <SmartDocumentHeader
          handleCurrentFolderChange={this.handleCurrentFolderChange}
          currentFolder={this.state.currentFolder}
        />
        <SmartDocumentMain
          userTokenObj  = {this.props.userTokenObj}
          currentFolder = {this.state.currentFolder}
          />
      </div>
    );
  }
}
