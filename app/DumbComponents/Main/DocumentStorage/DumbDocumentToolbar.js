import React        from 'react';
import PropTypes    from 'prop-types';

// Importing Material-UI Components
import IconButton         from 'material-ui/IconButton';
import IconMenu           from 'material-ui/IconMenu';
import FlatButton         from 'material-ui/FlatButton';
import RaisedButton       from 'material-ui/RaisedButton';
import MenuItem           from 'material-ui/MenuItem';
import {Toolbar}          from 'material-ui/Toolbar';
import {ToolbarGroup}     from 'material-ui/Toolbar';
import {ToolbarSeparator} from 'material-ui/Toolbar';
import {ToolbarTitle}     from 'material-ui/Toolbar';
import DropDownMenu       from 'material-ui/DropDownMenu';

// Importing Material-UI SVG-Icons
import MoreVertIcon       from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon           from 'material-ui/svg-icons/navigation/menu';
import FilterListIcon     from 'material-ui/svg-icons/content/filter-list';
import SortIcon           from 'material-ui/svg-icons/content/sort';



const DumbDocumentToolbar = (props) => {

  let currentFolder         = props.currentFolder;
  let onCurrentFolderChange = props.onCurrentFolderChange;
  let redirectToPath        = props.redirectToPath;

  return(
    <Toolbar className="DocumentStorageToolbar">
      <ToolbarGroup className="DSToolbarLeftGroup" firstChild={true}>
        <IconMenu
          value={currentFolder}
          onChange={onCurrentFolderChange}
          iconButtonElement={
            <IconButton>  <MenuIcon />  </IconButton>
          }
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        >
          <MenuItem value='All Meetings'      primaryText="All Meetings"    />
          <MenuItem value='Starred Meetings'  primaryText="Starred Meetings"/>
        {  /** <MenuItem value='Custom Category'   primaryText="Custom Category" /> **/}
          <MenuItem value='Trash'             primaryText='Trash'           />
        </IconMenu>
        <ToolbarTitle text={currentFolder}/>
      </ToolbarGroup>
      <ToolbarGroup className="DSToolbarRightGroup">
        <FlatButton
          label="Create New Meeting"
          onClick = {() => redirectToPath('')}
          primary={true}
        />
      </ToolbarGroup>
    </Toolbar>
  );
};

//--------------------------EXPECTED PROP TYPES---------------------------------

DumbDocumentToolbar.propTypes = {
  currentFolder:          PropTypes.string.isRequired,
  onCurrentFolderChange:  PropTypes.func.isRequired,
  redirectToPath:         PropTypes.func.isRequired,
};

export default DumbDocumentToolbar
