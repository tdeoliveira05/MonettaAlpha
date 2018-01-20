import React        from 'react';
import PropTypes    from 'prop-types';

// Importing Material-UI Components
import FlatButton         from 'material-ui/FlatButton';
import Checkbox           from 'material-ui/Checkbox';
import IconButton         from 'material-ui/IconButton';
import IconMenu           from 'material-ui/IconMenu';
import MenuItem           from 'material-ui/MenuItem';
import {Toolbar}          from 'material-ui/Toolbar';
import {ToolbarGroup}     from 'material-ui/Toolbar';
import {ToolbarSeparator} from 'material-ui/Toolbar';
import {ToolbarTitle}     from 'material-ui/Toolbar';
import Divider            from 'material-ui/Divider';


// Importing Material-UI SVG-Icons
import FilterListIcon     from 'material-ui/svg-icons/content/filter-list';
import MoreVertIcon       from 'material-ui/svg-icons/navigation/more-vert';
import SortIcon           from 'material-ui/svg-icons/content/sort';
import CheckboxToggleON   from 'material-ui/svg-icons/toggle/check-box';
import CheckboxToggleOFF  from 'material-ui/svg-icons/toggle/check-box-outline-blank';


const DumbDocumentFilterbar = (props) => (

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
    </div>

)

//-------------------------------EXPECTED PROP TYPES----------------------------
// DumbDocumentFilterbar.propTypes = {
//   props.propName: PropTypes.type,
//   //Example: currentFolder: PropTypes.string.isRequired,
// };

export default DumbDocumentFilterbar
