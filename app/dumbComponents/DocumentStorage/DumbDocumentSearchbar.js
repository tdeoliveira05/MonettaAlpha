import React        from 'react';
import PropTypes    from 'prop-types';


// Importing Material-UI Components
import AutoComplete from 'material-ui/AutoComplete';



const DumbDocumentSearchbar = (props) => {

  let meetingNames = props.meetingNames;

  return (
    <div className="DSSearchBarWrapper">
      <AutoComplete
        hintText="Search records"
        filter={AutoComplete.fuzzyFilter}
        dataSource={meetingNames}
        fullWidth={true}
      />
    </div>
  );
};

DumbDocumentSearchbar.propTypes = {
  meetingNames:     PropTypes.array.isRequired,
};

export default DumbDocumentSearchbar
