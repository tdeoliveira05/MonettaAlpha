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

  let filteredDocArray              = props.filteredDocArray;
  let handleMeetingCardClick        = props.handleMeetingCardClick;
  let handleStarredChange           = props.handleStarredChange;
  let handleEditButtonClick         = props.handleEditButtonClick;
  let meetingCardExpanded           = props.meetingCardExpanded;
  let meetingCardEditEnabled        = props.meetingCardEditEnabled;
  let meetingCardSelected           = props.meetingCardSelected;
  let handleSaveButtonClick         = props.handleSaveButtonClick;
  let handleMoveToTrashButtonClick  = props.handleMoveToTrashButtonClick;
  let handleTempChange              = props.handleTempChange;
  let docArray                      = props.docArray;

  let styles = {
    chip: {
      margin:   '4px',
      display:  'inline-flex',
      // flexWrap:  'wrap',
      left:     '-10px',
      height:   '35px',

    },
    chipWrapper: {
      width: '100%',
      // display: 'flex',
      // flexWrap: 'wrap',
      position: 'relative',
      top:  '-20px',
    },
    card: {
      height: 'auto',
    },
    cardHeader: {
      top: -18,
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
      width: '60%',
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
    },
    trashButton: {
      float: 'left',
      position: 'relative',
      bottom: '-20px',
      left: '-20px',
    }
  }

  let handleRequestDelete = () => {
    console.log('Why me?????')
  }

  // NOTE ohhhhhhhh what I could do is map below to all of tempDocArray then pass all of that through a filter based on the filtered Doc Array!!!!

  let meetingCards = docArray.map((meeting, index) => {
    if (filteredDocArray.indexOf(meeting) !== -1) {
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
                  onChange = {(event) => handleTempChange(event, 'title', index)}
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
                  onChange = {(event) => handleTempChange(event, 'location', index)}
                  />
                <div style={styles.chipWrapper}>
                  {{
                    true: (
                      <div className="DSParticipantChips">
                        <Chip
                        key={0}
                        style={styles.chip}
                        onRequestDelete = {handleRequestDelete}
                        >
                        {meeting.host.fullName}
                        </Chip>
                        {meeting.participants.map((participant, participantIndex) => {
                          return(
                            <Chip
                            key={participantIndex + 1}
                            style={styles.chip}
                            onRequestDelete = {handleRequestDelete}
                            >
                              {participant.fullName}
                            </Chip>
                          );
                        })}
                      </div>
                    ),
                    false: (
                      <div className="DSFilterbarChips">
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
                    )
                  }[meetingCardEditEnabled[meeting._id]]}

                </div>
              </div>
            </CardHeader>
            <CardText
              style={styles.cardText}
              expandable={!meetingCardEditEnabled[meeting._id]}>
              <h2> General </h2>
              {meeting.notes.map((note, noteIndex) => {
                if (note.category !== 'general') return
                return(
                  <TextField
                    underlineShow={meetingCardEditEnabled[meeting._id]}
                    multiLine = {true}
                    key = {noteIndex}
                    disabled = {!meetingCardEditEnabled[meeting._id]}
                    name = {JSON.stringify(noteIndex)}
                    value = {note.text}
                    onChange = {(event) => handleTempChange(event, 'note', index, noteIndex)}
                    style = {styles.noteTextField}
                    />
                )
              })}
              <h2> Actions </h2>
              {meeting.notes.map((note, noteIndex) => {
                if (note.category !== 'action') return
                return(
                  <TextField
                    underlineShow={meetingCardEditEnabled[meeting._id]}
                    multiLine = {true}
                    key = {noteIndex}
                    disabled = {!meetingCardEditEnabled[meeting._id]}
                    name = {JSON.stringify(noteIndex)}
                    value = {note.text}
                    onChange = {(event) => handleTempChange(event, 'note', index, noteIndex)}
                    style = {styles.noteTextField}
                    />
                )
              })}
              <h2> Decisions </h2>
              {meeting.notes.map((note, noteIndex) => {
                if (note.category !== 'decision') return
                return(
                  <TextField
                    underlineShow={meetingCardEditEnabled[meeting._id]}
                    multiLine = {true}
                    key = {noteIndex}
                    disabled = {!meetingCardEditEnabled[meeting._id]}
                    name = {JSON.stringify(noteIndex)}
                    value = {note.text}
                    onChange = {(event) => handleTempChange(event, 'note', index, noteIndex)}
                    style = {styles.noteTextField}
                    />
                )
              })}
              <CardActions>
                {{
                  true: (
                    <div>
                      <FlatButton
                        label="Move to Trash"
                        secondary={true}
                        onClick={(event) => handleMoveToTrashButtonClick(event, meeting._id)}
                        style={styles.trashButton}
                        />
                      <RaisedButton
                        label="Save"
                        secondary={true}
                        onClick = {(event) => handleSaveButtonClick(event, meeting._id, index)}
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
    }
  });

  return (filteredDocArray.length > 0 ? <div>{meetingCards}</div> : <h1>No Results</h1>)
}

export default DumbDocumentMeetingCards

//-------------------------------PROP TYPES-------------------------------------
DumbDocumentMeetingCards.propTypes = {
  // currentFolder:  PropTypes.string.isRequired,
  // userTokenObj:   PropTypes.object.isRequired,
  filteredDocArray:             PropTypes.array.isRequired,
  docArray:                 PropTypes.array.isRequired,
  handleMeetingCardClick:       PropTypes.func.isRequired,
  handleStarredChange:          PropTypes.func.isRequired,
  handleEditButtonClick:        PropTypes.func.isRequired,
  meetingCardExpanded:          PropTypes.object.isRequired,
  meetingCardEditEnabled:       PropTypes.object.isRequired,
  meetingCardSelected:          PropTypes.object.isRequired,
  handleSaveButtonClick:        PropTypes.func.isRequired,
  handleMoveToTrashButtonClick: PropTypes.func.isRequired,
  handleTempChange:             PropTypes.func.isRequired,
};
