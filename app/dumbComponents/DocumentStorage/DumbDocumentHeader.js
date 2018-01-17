import React from 'react';

import AppBar       from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton   from 'material-ui/IconButton';
import IconMenu     from 'material-ui/IconMenu';
import FontIcon     from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton   from 'material-ui/FlatButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem     from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon     from 'material-ui/svg-icons/navigation/menu';
import TextField    from 'material-ui/TextField';
import {Toolbar,
        ToolbarGroup,
        ToolbarSeparator,
  ToolbarTitle}     from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';



export default class DumbDocumentHeader extends React.Component {
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

    return(
      <div className='DocumentStorageHeader'>
        {/*<AppBar
          title='All Documents'
          iconElementRight= {<VertIconMenu />}
        />*/}
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <IconMenu
              value={this.state.displayedMeetingFolder}
              onChange={this.handleMeetingFolderDisplayChange}
              iconButtonElement={
                <IconButton><MenuIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            >
              <MenuItem value='All Meetings' primaryText="All Meetings" />
              <MenuItem value='Starred Meetings' primaryText="Starred Meetings" />
              <MenuItem value='Recent Meetings' primaryText="Recent Meetings" />
              <MenuItem value='Custom Category' primaryText="Custom Category" />
            </IconMenu>
            <ToolbarTitle text={this.state.displayedMeetingFolder}/>
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton label="Filter Results" primary={true} />
            <DropDownMenu label='Filters' >
              <MenuItem value={1} primaryText='Location' />
              <MenuItem value={2} primaryText='Members' />
              <MenuItem value={3} primaryText='Date' />
              <MenuItem value={4} primaryText='Length' />
            </DropDownMenu>
            <IconButton touch={true}><MoreVertIcon/></IconButton>
            <ToolbarSeparator />
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
            >
              <MenuItem primaryText="Download All" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
