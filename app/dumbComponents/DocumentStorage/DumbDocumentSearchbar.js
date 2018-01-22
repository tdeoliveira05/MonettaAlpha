import React        from 'react';
import PropTypes    from 'prop-types';


// Importing Material-UI Components
import AutoComplete from 'material-ui/AutoComplete';



const DumbDocumentSearchbar = (props) => {

  let meetingNames = props.meetingNames;
  let onSearchTextChange = props.onSearchTextChange;

  return (
    <div className="DSSearchBarWrapper">
      <AutoComplete
        hintText="Search records"
        filter={AutoComplete.fuzzyFilter}
        dataSource={meetingNames}
        fullWidth={true}
        onUpdateInput={(inputValue) => onSearchTextChange(inputValue)}
      />
    </div>
  );
};

DumbDocumentSearchbar.propTypes = {
  meetingNames:       PropTypes.array.isRequired,
  onSearchTextChange: PropTypes.func.isRequired
};

export default DumbDocumentSearchbar
