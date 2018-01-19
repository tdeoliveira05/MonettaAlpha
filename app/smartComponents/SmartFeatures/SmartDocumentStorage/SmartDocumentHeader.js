import React                  from 'react';
import DumbDocumentToolbar    from '../../../dumbComponents/DocumentStorage/DumbDocumentToolbar.js';
import DumbDocumentSearchbar  from '../../../dumbComponents/DocumentStorage/DumbDocumentSearchbar.js';


export default class SmartDocumentHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayedMeetingFolder: 'All Meetings',
      meetingNames : [
        'Code Review',
        'Milestones',
        'Product Design Session',
        'Pre-release checklist',
        'Crash analysis' ],
    };
    this.handleMeetingFolderDisplayChange = this.handleMeetingFolderDisplayChange.bind(this)
  }

  handleMeetingFolderDisplayChange(event, value){
    this.setState({displayedMeetingFolder: value});
    console.log(this.state.displayedMeetingFolder);
  }

  render() {
  //---------------------------CONDITIONS-------------------------------------


  //----------------------------RETURN----------------------------------------
    return(
      <div className='DocumentStorageHeader'>

        <DumbDocumentToolbar
          displayedMeetingFolder={this.state.displayedMeetingFolder}
          onMeetingFolderDisplayChange={this.handleMeetingFolderDisplayChange} />

        <DumbDocumentSearchbar
          meetingNames={this.state.meetingNames} />

      </div>
    );
  }
}
