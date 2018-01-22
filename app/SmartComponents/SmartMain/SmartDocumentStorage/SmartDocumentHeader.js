import React from 'react';

// Importing Material-UI Components
import AppBar       from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton   from 'material-ui/IconButton';
import IconMenu     from 'material-ui/IconMenu';
import FontIcon     from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton   from 'material-ui/FlatButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem     from 'material-ui/MenuItem';
import TextField    from 'material-ui/TextField';
import {Toolbar,
        ToolbarGroup,
        ToolbarSeparator,
  ToolbarTitle}     from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';

// Importing Material-UI SVG-Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon     from 'material-ui/svg-icons/navigation/menu';
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import SortIcon     from 'material-ui/svg-icons/content/sort';



export default class SmartDocumentHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayedMeetingFolder: 'All Meetings',
      valueFilter : 1
    };
    this.handleMeetingFolderDisplayChange = this.handleMeetingFolderDisplayChange.bind(this)
  }

  handleMeetingFolderDisplayChange(event, value){
    this.setState({displayedMeetingFolder: value});
    console.log(this.state.displayedMeetingFolder);
  }

  render() {

    // Data source example for the autocomplete search field
    const meetingNames = [
      'Code Review',
      'Milestones',
      'Product Design Session',
      'Pre-release checklist',
      'Crash analysis'
    ];


    return(
      <div className='DocumentStorageHeader'>
        <Toolbar className="DocumentStorageToolbar">
          <ToolbarGroup className="DSToolbarLeftGroup" firstChild={true}>
            <IconMenu
              value={this.state.displayedMeetingFolder}
              onChange={this.handleMeetingFolderDisplayChange}
              iconButtonElement={
                <IconButton><MenuIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
              <MenuItem value='All Meetings' primaryText="All Meetings" />
              <MenuItem value='Starred Meetings' primaryText="Starred Meetings" />
              <MenuItem value='Recent Meetings' primaryText="Recent Meetings" />
              <MenuItem value='Custom Category' primaryText="Custom Category" />
            </IconMenu>
            <ToolbarTitle text={this.state.displayedMeetingFolder}/>
          </ToolbarGroup>
          <ToolbarGroup className="DSToolbarRightGroup">
            <FlatButton
              label="Filter"
              labelPosition='after'
              primary={false}
              icon={<FilterListIcon />}  />
            <FlatButton
              label="Sort"
              labelPosition='after'
              primary={false}
              icon={<SortIcon />}  />
            {/*<DropDownMenu label='Filters' >
              <MenuItem value={1} primaryText='Location' />
              <MenuItem value={2} primaryText='Members' />
              <MenuItem value={3} primaryText='Date' />
              <MenuItem value={4} primaryText='Length' />
            </DropDownMenu>*/}


            <ToolbarSeparator />

            {/*Additional Options Button (Download)*/}
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
              <MenuItem primaryText="Download All" />
              <MenuItem primaryText="Download Selected" />
              <MenuItem primaryText="Share" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help & Feedback" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <div className="DSSearchBarWrapper">
          <AutoComplete
            hintText="Search records"
            filter={AutoComplete.fuzzyFilter}
            dataSource={meetingNames}
            fullWidth={true}
          />
        </div>
      </div>
    );
  }
}
