import React      from 'react';
import PropTypes  from 'prop-types';


// Importing Material-UI Components
import IconButton   from 'material-ui/IconButton';
import IconMenu     from 'material-ui/IconMenu';
import FontIcon     from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton   from 'material-ui/FlatButton';
import MenuItem     from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Checkbox     from 'material-ui/Checkbox';
import Chip         from 'material-ui/Chip';
import TextField    from 'material-ui/TextField';



// Importing Material-UI SVG-Icons
import MoreVertIcon   from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon       from 'material-ui/svg-icons/navigation/menu';
import StarToggleON   from 'material-ui/svg-icons/toggle/star';
import StarToggleOFF  from 'material-ui/svg-icons/toggle/star-border';




const DumbDocumentMeetingCards = (props) => {

  let filteredDocArray            = props.filteredDocArray;
  let handleMeetingCardClick      = props.handleMeetingCardClick;
  let handleStarredChange         = props.handleStarredChange;
  let handleEditButtonClick       = props.handleEditButtonClick;
  let meetingCardExpanded         = props.meetingCardExpanded;
  let meetingCardEditEnabled      = props.meetingCardEditEnabled;
  let meetingCardSelected         = props.meetingCardSelected;
  let handleCancelEditButtonClick = props.handleCancelEditButtonClick;
  let handleSaveButtonClick       = props.handleSaveButtonClick;

  let styles = {
    chip: {
      margin:   '4px',
      display:  'inline-block',
      left:     '-10px',
    },
    chipWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      top:  '-20px',
    },
    card: {
      height: 'auto',
    },
    cardHeader: {
      top: -48,
      left: 35,
      marginRight: 35,
    },
    date: {
      // color: '#6699ff',
      color: '#454545',
      position: 'relative',
      top: '-30px',
    },
    location: {
      position: 'relative',
      top: '-30px',
    },
    starIcon: {
      display: "inline-block",
      position: 'relative',
      top: '9px',
      left: '5px',
      maxWidth: 25,
    },
    headerTextField: {
      fontSize: '20px',
       position: 'relative',
        top: '-20px'
    },
    noteTextField: {
      width: '50%',
    },
    cardText: {
      position: 'relative',
      left: '35px',
      top: '-50px',
      width: '90%',
    },
    editButton: {
      float: 'right',
      left: '40px',
      position: 'relative',
      bottom: '-20px',
    }
  }

  let meetingCards = filteredDocArray.map((meeting, index) => {
    return (
      <div className="MeetingPreviewCardWrapper" key={index} >
        <Card
          style={styles.card}
          className="MeetingPreviewCard"
          onExpandChange={(event) => {
            handleMeetingCardClick(event, meeting._id)
          }}>
          <CardActions>
            <Checkbox
              style={styles.starIcon}
              checked={meeting.metaData.starred}
              onCheck={() => handleStarredChange(meeting._id, index)}
              checkedIcon={<StarToggleON />}
              uncheckedIcon={<StarToggleOFF />} />
          </CardActions>
          <CardHeader
            style={styles.cardHeader}
            actAsExpander={true}
            showExpandableButton={true} >
            <div >
              <TextField
                underlineShow={meetingCardEditEnabled[meeting._id]}
                multiLine = {false}
                disabled = {!meetingCardEditEnabled[meeting._id]}
                style={styles.headerTextField}
                name = {JSON.stringify(index)}
                value = {meeting.title}
                />
              <h3 style={styles.date}>
                {new Date(meeting.date).toString('MMMM dS, yyyy')
                .slice(0, 21)}
              </h3>
              <TextField
                underlineShow={meetingCardEditEnabled[meeting._id]}
                multiLine = {false}
                disabled = {!meetingCardEditEnabled[meeting._id]}
                style = {styles.location}
                name = {JSON.stringify(index)}
                value = {meeting.location}
                />
              <div style={styles.chipWrapper}>
                <Chip
                key={0}
                style={styles.chip}
                >
                {meeting.host.fullName}
                </Chip>
                {meeting.participants.map((participant, participantIndex) => {
                  return(
                    <Chip
                    key={participantIndex + 1}
                    style={styles.chip}
                    >
                      {participant.fullName}
                    </Chip>
                  );
                })}
              </div>
            </div>
          </CardHeader>
          <CardText
            style={styles.cardText}
            expandable={!meetingCardEditEnabled[meeting._id]}>
            <h2> General </h2>
            {meeting.notes.map((note, noteindex) => {
              if (note.category !== 'general') return
              return(
                <TextField
                  underlineShow={meetingCardEditEnabled[meeting._id]}
                  multiLine = {true}
                  key = {noteindex}
                  disabled = {!meetingCardEditEnabled[meeting._id]}
                  name = {JSON.stringify(noteindex)}
                  value = {note.text}
                  style = {styles.noteTextField}
                  />
              )
            })}
            <h2> Actions </h2>
            {meeting.notes.map((note, noteindex) => {
              if (note.category !== 'action') return
              return(
                <TextField
                  underlineShow={meetingCardEditEnabled[meeting._id]}
                  multiLine = {true}
                  key = {noteindex}
                  disabled = {!meetingCardEditEnabled[meeting._id]}
                  name = {JSON.stringify(noteindex)}
                  value = {note.text}
                  style = {styles.noteTextField}
                  />
              )
            })}
            <h2> Decisions </h2>
            {meeting.notes.map((note, noteindex) => {
              if (note.category !== 'decision') return
              return(
                <TextField
                  underlineShow={meetingCardEditEnabled[meeting._id]}
                  multiLine = {true}
                  key = {noteindex}
                  disabled = {!meetingCardEditEnabled[meeting._id]}
                  name = {JSON.stringify(noteindex)}
                  value = {note.text}
                  style = {styles.noteTextField}
                  />
              )
            })}
            <CardActions>
              {{
                true: (
                  <div>
                    <FlatButton
                      label="Cancel"
                      primary={true}
                      onClick = {(event) => handleCancelEditButtonClick(event, meeting._id)}
                      style={styles.editButton}
                      />
                    <RaisedButton
                      label="Save"
                      primary={true}
                      onClick = {(event) => handleSaveButtonClick(event, meeting._id)}
                      style={styles.editButton}
                      />
                  </div>
                ),
                false: (
                  <RaisedButton
                    label="Edit"
                    primary={true}
                    onClick = {(event) => handleEditButtonClick(event, meeting._id)}
                    style={styles.editButton}
                    />
                )
              }[meetingCardEditEnabled[meeting._id]]}


            </CardActions>
          </CardText>
        </Card>
      </div>
    )
  });
  return (filteredDocArray.length > 0 ? <div>{meetingCards}</div> : <h1>No Results</h1>)
}

export default DumbDocumentMeetingCards

//-------------------------------PROP TYPES-------------------------------------
DumbDocumentMeetingCards.propTypes = {
  // currentFolder:  PropTypes.string.isRequired,
  // userTokenObj:   PropTypes.object.isRequired,
  filteredDocArray:             PropTypes.array.isRequired,
  handleMeetingCardClick:       PropTypes.func.isRequired,
  handleStarredChange:          PropTypes.func.isRequired,
  handleEditButtonClick:        PropTypes.func.isRequired,
  meetingCardExpanded:          PropTypes.object.isRequired,
  meetingCardEditEnabled:       PropTypes.object.isRequired,
  meetingCardSelected:          PropTypes.object.isRequired,
  handleCancelEditButtonClick:  PropTypes.func.isRequired,
  handleSaveButtonClick:        PropTypes.func.isRequired,
};
