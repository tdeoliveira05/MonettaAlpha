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
import Popover      from 'material-ui/Popover';
import Menu         from 'material-ui/Menu';




// Importing Material-UI SVG-Icons
import MoreVertIcon       from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon           from 'material-ui/svg-icons/navigation/menu';
import StarToggleON       from 'material-ui/svg-icons/toggle/star';
import StarToggleOFF      from 'material-ui/svg-icons/toggle/star-border';
import DeleteIcon         from 'material-ui/svg-icons/action/delete';
import DeleteForeverIcon  from 'material-ui/svg-icons/action/delete-forever';
import AddIcon            from 'material-ui/svg-icons/content/add';
import ClearIcon          from 'material-ui/svg-icons/content/clear';




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
  let handleDeleteForeverClick      = props.handleDeleteForeverClick;
  let handleRequestChipDelete       = props.handleRequestChipDelete;
  let docArray                      = props.docArray;
  let allParticipants               = props.allParticipants;
  let participantsPerMeeting        = props.participantsPerMeeting;
  let showParticipantMenu           = props.showParticipantMenu;
  let participantMenuAnchor         = props.participantMenuAnchor;
  let handleAddParticipantButtonClick = props.handleAddParticipantButtonClick;
  let handleAddParticipant          = props.handleAddParticipant;
  let handleAddNoteClick            = props.handleAddNoteClick;
  let handleDeleteNoteClick         = props.handleDeleteNoteClick;

  let styles = {
    card: {
      height: 'auto',
      justifyContent: 'center',
      // textAlign: 'center',
    },
    starIcon: {
      display: "inline-block",
      position: 'relative',
      top: '9px',
      left: '5px',
      maxWidth: 25,
    },
    cardHeader: {
      // top: -18,
      // left: 60,
      paddingBottom: 40,
      // marginRight: 35,
      margin: 'auto',
      textAlign: 'left',
      width: '83%',
    },
    headerTextField: {
      fontSize: '21px',
      width: '100%',
       position: 'relative',
        top: '-20px'
    },
    date: {
      // color: '#6699ff',
      color: '#454545',
      position: 'relative',
      top: '-30px',
    },
    location: {
      position: 'relative',
      width: '100%',
      top: '-30px',
    },
    chip: {
      margin:   '4px',
      display:  'inline-flex',
      flexWrap:  'wrap',
      left:     '-10px',
      height:   '35px',

    },
    chipWrapper: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      top:  '-20px',
    },
    noteHeader: {
    },
    noteTitleWrapper: {
      display: 'inline-flex',
    },
    noteWrapper: {
      width: '100%',
      padding: '0px',
    },
    singleNoteRow: {
      width: '100%',
      display: 'inline-flex',
    },
    noteTextField: {
      width: '100%',
    },
    addNoteButton: {
      position: 'relative',
      bottom: '-5px',
      // left: '-7px',
    },
    deleteNoteButton: {
      position: 'relative',
      margin: 'auto 0px',
      padding: '0px',
    },
    cardText: {
      position: 'relative',
      margin: 'auto',
      top: '-50px',
      width: '80%',
    },
    editButton: {
      float: 'right',
      position: 'relative',
      bottom: '-25px',
    },
    trashButton: {
      float: 'right',
      position: 'relative',
      bottom: '-20px',
      right: '-150px',
    },
    trashForeverButton: {
      float: 'right',
      position: 'relative',
      bottom: '-20px',
      right: '-175px',
    },
    addParticipantsButton: {
      position: 'relative',
      bottom: '2px',
      left: '-7px',
    }
  }


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
              iconStyle={{margin: '0px'}}
              style={styles.cardHeader}
              actAsExpander={true}
              showExpandableButton={true} >
              <div >
                <TextField
                  className="DSMeetingCardTitle"
                  underlineShow={meetingCardEditEnabled[meeting._id]}
                  multiLine = {true}
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
                  multiLine = {true}
                  disabled = {!meetingCardEditEnabled[meeting._id]}
                  style = {styles.location}
                  name = {JSON.stringify(index)}
                  value = {meeting.location}
                  onChange = {(event) => handleTempChange(event, 'location', index)}
                  />
                <div style={styles.chipWrapper}>
                  {{
                    true: (
                      <div className="DSParticipantChips" >
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
                            onRequestDelete = {(event) => handleRequestChipDelete(event, index, participantIndex)}
                            >
                              {participant.fullName}
                            </Chip>
                          );
                        })}
                        <IconButton
                          style={styles.addParticipantsButton}
                          onClick={(event) => handleAddParticipantButtonClick(event)}>
                          <AddIcon/>
                        </IconButton>
                        <div className="AddParticipantsMenu" >
                          <Popover
                            open={showParticipantMenu}
                            anchorEl={participantMenuAnchor}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            onRequestClose={handleAddParticipantButtonClick}>
                            <Menu>
                              {allParticipants.map((participant, pIndex) => {
                                if (participantsPerMeeting[index].indexOf(participant) === -1) {
                                  return(
                                    <MenuItem
                                      value = {participant}
                                      key = {pIndex}
                                      primaryText = {participant}
                                      onClick= {(event) => handleAddParticipant(participant, index)}/>
                                  )
                                }
                                })
                              }
                            </Menu>
                          </Popover>
                        </div>
                      </div>
                    ),
                    false: (
                      <div className="DSParticipantChips">
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
              <div style={styles.noteTitleWrapper} >
                <h2 style={styles.noteHeader}> General </h2>
                {{
                  true: (
                    <IconButton
                      style={styles.addNoteButton}
                      onClick={() => handleAddNoteClick('general', index)}>
                      <AddIcon/>
                    </IconButton>
                  ),
                  false: (
                    <div>
                    </div>
                  )
                }[meetingCardEditEnabled[meeting._id]]}
              </div>
              <div style={styles.noteWrapper}>
                {meeting.notes.map((note, noteIndex) => {
                  if (note.category !== 'general') return
                  return(
                    <div
                      style={styles.singleNoteRow}
                      key = {noteIndex}
                      >
                      <TextField
                        underlineShow={meetingCardEditEnabled[meeting._id]}
                        multiLine = {true}
                        disabled = {!meetingCardEditEnabled[meeting._id]}
                        name = {JSON.stringify(noteIndex)}
                        value = {note.text}
                        onChange = {(event) => handleTempChange(event, 'note', index, noteIndex)}
                        style = {styles.noteTextField}
                        />
                        {{
                          true: (
                            <IconButton
                              style={styles.deleteNoteButton}
                              onClick={() => handleDeleteNoteClick(noteIndex, index)}>
                              <ClearIcon
                                style={styles.deleteNoteButton}
                                />
                            </IconButton>
                          ),
                          false: (
                            <div>
                            </div>
                          )
                        }[meetingCardEditEnabled[meeting._id]]}
                    </div>
                  )
                })}
              </div>
              <div style={styles.noteTitleWrapper}>
                <h2 style={styles.noteHeader}> Actions </h2>
                {{
                  true: (
                    <IconButton
                      style={styles.addNoteButton}
                      onClick={() => handleAddNoteClick('action', index)}>
                      <AddIcon/>
                    </IconButton>
                  ),
                  false: (
                    <div>
                    </div>
                  )
                }[meetingCardEditEnabled[meeting._id]]}
              </div>
              <div style={styles.noteWrapper}>
                {meeting.notes.map((note, noteIndex) => {
                  if (note.category !== 'action') return
                  return(
                    <div
                      style={styles.singleNoteRow}
                      key = {noteIndex}
                      >
                      <TextField
                        underlineShow={meetingCardEditEnabled[meeting._id]}
                        multiLine = {true}
                        disabled = {!meetingCardEditEnabled[meeting._id]}
                        name = {JSON.stringify(noteIndex)}
                        value = {note.text}
                        onChange = {(event) => handleTempChange(event, 'note', index, noteIndex)}
                        style = {styles.noteTextField}
                        />
                        {{
                          true: (
                            <IconButton
                              style={styles.deleteNoteButton}
                              onClick={() => handleDeleteNoteClick(noteIndex, index)}>
                              <ClearIcon/>
                            </IconButton>
                          ),
                          false: (
                            <div>
                            </div>
                          )
                        }[meetingCardEditEnabled[meeting._id]]}
                    </div>
                  )
                })}
              </div>
              <div style={styles.noteTitleWrapper}>
                <h2 style={styles.noteHeader}> Decisions </h2>
                {{
                  true: (
                    <IconButton
                      style={styles.addNoteButton}
                      onClick={() => handleAddNoteClick('decision', index)}>
                      <AddIcon/>
                    </IconButton>
                  ),
                  false: (
                    <div>
                    </div>
                  )
                }[meetingCardEditEnabled[meeting._id]]}
              </div>
              <div style={styles.noteWrapper}>
                {meeting.notes.map((note, noteIndex) => {
                  if (note.category !== 'decision') return
                  return(
                    <div
                      style={styles.singleNoteRow}
                      key = {noteIndex}
                      >
                      <TextField
                        underlineShow={meetingCardEditEnabled[meeting._id]}
                        multiLine = {true}
                        disabled = {!meetingCardEditEnabled[meeting._id]}
                        name = {JSON.stringify(noteIndex)}
                        value = {note.text}
                        onChange = {(event) => handleTempChange(event, 'note', index, noteIndex)}
                        style = {styles.noteTextField}
                        />
                        {{
                          true: (
                            <IconButton
                              style={styles.deleteNoteButton}
                              onClick={() => handleDeleteNoteClick(noteIndex, index)}>
                              <ClearIcon/>
                            </IconButton>
                          ),
                          false: (
                            <div>
                            </div>
                          )
                        }[meetingCardEditEnabled[meeting._id]]}
                    </div>
                  )
                })}
              </div>
              <CardActions>

                {{
                  true: (
                    <div>
                      <RaisedButton
                        label="Undo Trash"
                        primary={true}
                        onClick = {(event) => handleMoveToTrashButtonClick(event, meeting._id)}
                        style={styles.editButton}
                        />
                      <IconButton
                        style={styles.trashForeverButton}
                        onClick={(event) => handleDeleteForeverClick(event, index)}
                        >
                        <DeleteForeverIcon />
                      </IconButton>
                    </div>
                  ),
                  false: (
                    <div>
                      <div>
                      {{
                        true: (
                          <RaisedButton
                            label="Save"
                            secondary={true}
                            onClick = {(event) => handleSaveButtonClick(event, meeting._id, index)}
                            style={styles.editButton}
                            />
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
                      </div>
                      <IconButton
                        style={styles.trashButton}
                        onClick={(event) => handleMoveToTrashButtonClick(event, meeting._id)}
                        >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )
                }[meeting.metaData.trash]}

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
  docArray:                     PropTypes.array.isRequired,
  handleMeetingCardClick:       PropTypes.func.isRequired,
  handleStarredChange:          PropTypes.func.isRequired,
  handleEditButtonClick:        PropTypes.func.isRequired,
  meetingCardExpanded:          PropTypes.object.isRequired,
  meetingCardEditEnabled:       PropTypes.object.isRequired,
  meetingCardSelected:          PropTypes.object.isRequired,
  handleSaveButtonClick:        PropTypes.func.isRequired,
  handleMoveToTrashButtonClick: PropTypes.func.isRequired,
  handleTempChange:             PropTypes.func.isRequired,
  handleDeleteForeverClick:     PropTypes.func.isRequired,
  handleRequestChipDelete:      PropTypes.func.isRequired,
  allParticipants:              PropTypes.array.isRequired,
  participantsPerMeeting:       PropTypes.array.isRequired,
  showParticipantMenu:          PropTypes.bool.isRequired,
  participantMenuAnchor:        PropTypes.object,
  handleAddParticipantButtonClick: PropTypes.func.isRequired,
  handleAddParticipant:         PropTypes.func.isRequired,
  handleAddNoteClick:           PropTypes.func.isRequired,
  handleDeleteNoteClick:        PropTypes.func.isRequired,
};
