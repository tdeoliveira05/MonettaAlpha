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
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

// Importing Material-UI SVG-Icons
import MoreVertIcon   from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon       from 'material-ui/svg-icons/navigation/menu';
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import SortIcon       from 'material-ui/svg-icons/content/sort';
import StarToggleON   from 'material-ui/svg-icons/toggle/star';
import StarToggleOFF  from 'material-ui/svg-icons/toggle/star-border';



// const styles = {
//   block: {
//     positionTop: 100,
//   },
//   checkbox: {
//     positionBottom: 0,
//   },
//   icon: {
//     boxColor: '#000000',
//     checkedColor: "#fecb45",
//   },
// };

export default class SmartDocumentMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    // MeetingNames example to populate cards
    const meetingNames = [
      'Code Review',
      'Milestones',
      'Product Design Session',
      'Pre-release checklist',
      'Crash analysis',
      'Code Review',
      'Milestones',
      'Product Design Session',
      'Pre-release checklist',
      'Crash analysis'
    ];

    const meetingCards = meetingNames.map(meetingName => {
      		return (
            <Card className="MeetingPreviewCard">
            <CardActions>
              <Checkbox
                checkedIcon={<StarToggleON />}
                uncheckedIcon={<StarToggleOFF />}
              />
            </CardActions>
              <CardHeader
                title={meetingName}
                subtitle="Subtitle"
                actAsExpander={true}
                showExpandableButton={true}
              />

              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>
      		)
    	});

    return (
      <div className="DocumentStorageCardsWrapper" >
        {/*/<Card>
          <CardHeader
            title="Without Avatar"
            subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>*/}
        {meetingCards}
      </div>
    );
  }
}

// SmartDocumentMain.proptypes = {
// };
