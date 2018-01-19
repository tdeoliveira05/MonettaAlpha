import React from 'react';

// Importing Material-UI Components
import IconButton   from 'material-ui/IconButton';
import IconMenu     from 'material-ui/IconMenu';
import FlatButton   from 'material-ui/FlatButton';
import MenuItem     from 'material-ui/MenuItem';
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



const DumbDocumentToolbar = (props) => {
  //  props:
  //    displayedMeetingFolder        (type: String)
  //    onMeetingFolderDisplayChange  (type: Function)

  return(
    <Toolbar className="DocumentStorageToolbar">
      <ToolbarGroup className="DSToolbarLeftGroup" firstChild={true}>
        <IconMenu
          value={props.displayedMeetingFolder}
          onChange={props.onMeetingFolderDisplayChange}
          iconButtonElement={
            <IconButton>  <MenuIcon />  </IconButton>
          }
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        >
          <MenuItem value='All Meetings'      primaryText="All Meetings"      />
          <MenuItem value='Starred Meetings'  primaryText="Starred Meetings"  />
          <MenuItem value='Recent Meetings'   primaryText="Recent Meetings"   />
          <MenuItem value='Custom Category'   primaryText="Custom Category"   />
        </IconMenu>
        <ToolbarTitle text={props.displayedMeetingFolder}/>
      </ToolbarGroup>
      <ToolbarGroup className="DSToolbarRightGroup">
        <FlatButton
          label="Filter"
          labelPosition='after'
          primary={false}
          icon={<FilterListIcon />}
        />
        <FlatButton
          label         = "Sort"
          labelPosition = 'after'
          primary       = {false}
          icon          = {<SortIcon />}
        />
        <ToolbarSeparator />
        {/*Additional Options Button (Download etc.)*/}
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
          <MenuItem   primaryText="Download All"      />
          <MenuItem   primaryText="Download Selected" />
          <MenuItem   primaryText="Share"             />
          <MenuItem   primaryText="Settings"          />
          <MenuItem   primaryText="Help & Feedback"   />
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>
  );
}

export default DumbDocumentToolbar
