import React        from 'react';
import PropTypes    from 'prop-types';

// Importing Material-UI Components
import FlatButton         from 'material-ui/FlatButton';
import Checkbox           from 'material-ui/Checkbox';
import IconButton         from 'material-ui/IconButton';
import IconMenu           from 'material-ui/IconMenu';
import MenuItem           from 'material-ui/MenuItem';
import Divider            from 'material-ui/Divider';
import Paper              from 'material-ui/Paper';
import SelectField        from 'material-ui/SelectField';
import DatePicker         from 'material-ui/DatePicker';


// Importing Material-UI SVG-Icons
import FilterListIcon     from 'material-ui/svg-icons/content/filter-list';
import MoreVertIcon       from 'material-ui/svg-icons/navigation/more-vert';
import SortIcon           from 'material-ui/svg-icons/content/sort';
import CheckboxToggleON   from 'material-ui/svg-icons/toggle/check-box';
import CheckboxToggleOFF  from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import ClearIcon          from 'material-ui/svg-icons/content/clear';

const DumbDocumentFilterbar = (props) => {

  let onFilterButtonClick       = props.onFilterButtonClick;
  let filterMenuStatus          = props.filterMenuStatus;
  let filters                   = props.filters;
  // filters.(location/participants/dateFrom/dateTo)
  let allLocations              = props.allLocations;
  let onLocationFilterChange    = props.onLocationFilterChange;
  let allParticipants           = props.allParticipants;
  let onParticipantFilterChange = props.onParticipantFilterChange;
  let onDateToFilterChange      = props.onDateToFilterChange;
  let onDateFromFilterChange    = props.onDateFromFilterChange;
  let onClickClearFiltersButton         = props.onClickClearFiltersButton;

  let selectionRenderer = (values) => {
      switch (values.length) {
        case 0:
          return 'None Selected';
        case 1:
          return allParticipants[values[0]];
        default:
          return `${values.length} names selected`;
      }
  }

  let filterMenu = () => {
    if (filterMenuStatus === 'display') {
      return (
        <div className="FilterOptionsMenu" >
          <Paper >
            <SelectField
              className="LocationFilterField"
              floatingLabelText="Location"
              value={filters.location}
              onChange={onLocationFilterChange} >
              <MenuItem value='Display All' primaryText='Display All' />
              {allLocations.map((location, index) => {
                return <MenuItem key={index} value={location} primaryText={location} />
              })}
            </SelectField >
            <SelectField
              className="ParticipantFilterField"
              floatingLabelText="Participants"
              multiple={true}
              value={filters.participants}
              onChange={onParticipantFilterChange}
              selectionRenderer={selectionRenderer}>
              <MenuItem value='Display All' primaryText='Display All' />
              {allParticipants.map((participant, index) => {
                return <MenuItem
                  key={index + 1}
                  insetChildren={true}
                  checked={filters.participants.indexOf(participant) > -1}
                  value={participant}
                  primaryText={participant}
                  />
              })}
            </SelectField >
            <DatePicker
              className="DateFromFilterField"
              floatingLabelText="From Date"
              container="inline"
              value={filters.dateFrom}
              onChange={onDateFromFilterChange}
              autoOk={true}
              maxDate={new Date()}/>
            <DatePicker
              className="DateToFilterField"
              floatingLabelText="To Date"
              container="inline"
              value={filters.dateTo}
              onChange={onDateToFilterChange}
              autoOk={true}
              maxDate={new Date()}/>
            <IconButton className="ClearFilterButton">
              <ClearIcon onClick={onClickClearFiltersButton}/>
            </IconButton>
          </Paper>
        </div>
      );
    }
  }

  return(
    <div className="DSFilterbarWrapper">
      <div className="DSFilterbarLeft" >
        {/*<Checkbox
          checkedIcon={<CheckboxToggleON />}
          uncheckedIcon={<CheckboxToggleOFF />}
        />*/}
        <FlatButton
          label         ="Select All"
          labelPosition ='after'
          primary       ={false}
          icon          ={<CheckboxToggleOFF />}
        />
      </div>
      <div className="DSFilterbarRight" >
        <FlatButton
          label         ="Filter"
          labelPosition ='after'
          onClick       ={() => onFilterButtonClick()}
          primary       ={false}
          icon          ={<FilterListIcon />}
        />
        <FlatButton
          label         = "Sort"
          labelPosition = 'after'
          primary       = {false}
          icon          = {<SortIcon />}
        />
      </div>
      <div className="DSFilterbarMenuIcon" >
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
          <MenuItem   primaryText="Download Selected" />
          <MenuItem   primaryText="Delete Selected"   />
          <MenuItem   primaryText="Share"             />
          <MenuItem   primaryText="Settings"          />
          <MenuItem   primaryText="Help & Feedback"   />
        </IconMenu>
      </div>
      {/*<Divider />*/}
      {filterMenu()}
    </div>
  );
}

//-------------------------------PROP TYPES-------------------------------------
DumbDocumentFilterbar.propTypes = {
  onFilterButtonClick:       PropTypes.func.isRequired,
  filterMenuStatus:          PropTypes.string.isRequired,
  filters:                   PropTypes.object.isRequired,
  allLocations:              PropTypes.array.isRequired,
  onLocationFilterChange:    PropTypes.func.isRequired,
  allParticipants:           PropTypes.array.isRequired,
  onParticipantFilterChange: PropTypes.func.isRequired,
  onDateToFilterChange:      PropTypes.func.isRequired,
  onDateFromFilterChange:    PropTypes.func.isRequired,
  onClickClearFiltersButton:         PropTypes.func.isRequired,
};

export default DumbDocumentFilterbar
