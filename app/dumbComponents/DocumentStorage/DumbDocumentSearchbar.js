import React from 'react';


// Importing Material-UI Components
import AutoComplete from 'material-ui/AutoComplete';



const DumbDocumentSearchbar = (props) => {
  //  props:
  //    meetingNames (type: Array)

  return(
    <div className="DSSearchBarWrapper">
      <AutoComplete
        hintText="Search records"
        filter={AutoComplete.fuzzyFilter}
        dataSource={props.meetingNames}
        fullWidth={true}
      />
    </div>
  );
}

export default DumbDocumentSearchbar
