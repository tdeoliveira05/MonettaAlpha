import React      from 'react';
import axios      from 'axios';
import PropTypes  from 'prop-types';
import moment     from 'moment';


import DumbDocumentSearchbar    from '../../../DumbComponents/Main/DocumentStorage/DumbDocumentSearchbar.js';
import DumbDocumentFilterbar    from '../../../DumbComponents/Main/DocumentStorage/DumbDocumentFilterbar.js';
import DumbDocumentMeetingCards from '../../../DumbComponents/Main/DocumentStorage/DumbDocumentMeetingCards.js';


export default class SmartDocumentMain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      docArray: [], // Refer to models/meetingModel
      temp: '',
      searchText: '',
      showFilterMenu: false,
      sortMenuAnchor: {},
      showParticipantMenu: false,
      participantMenuAnchor: {},
      filterMenuAnchor: {},
      filters: {
        location: 'Display All',
        participants:  [''],
        dateFrom: null,
        dateTo:   new Date()
      },
      showSortMenu: false,
      sortObj: {
        type: 'date',
        order: 'desc'
      },
      allLocations: [],
      allParticipants: [],
      participantProfiles: {},
      participantsPerMeeting: [],
      meetingCardExpanded: {
        // meetingID: boolean (expanded or not)
      },
      meetingCardSelected: {
        // meetingID: boolean (selected or not)
      },
      meetingCardEditEnabled: {
        // meetingID: boolean (can edit or not)
      },
    }

    this.handleTempChange               = this.handleTempChange.bind(this)

    this.intializeStateVariables        = this.intializeStateVariables.bind(this)
    this.handleSearchTextChange         = this.handleSearchTextChange.bind(this)
    this.handleFilterButtonClick        = this.handleFilterButtonClick.bind(this)
    this.handleLocationFilterChange     = this.handleLocationFilterChange.bind(this)
    this.handleParticipantFilterChange  = this.handleParticipantFilterChange.bind(this)
    this.handleDateFromFilterChange     = this.handleDateFromFilterChange.bind(this)
    this.handleDateToFilterChange       = this.handleDateToFilterChange.bind(this)
    this.handleClickClearFiltersButton  = this.handleClickClearFiltersButton.bind(this)
    this.handleSortButtonClick          = this.handleSortButtonClick.bind(this)
    this.handleSortByChange             = this.handleSortByChange.bind(this)
    this.handleMeetingCardClick         = this.handleMeetingCardClick.bind(this)
    this.handleStarredChange            = this.handleStarredChange.bind(this)
    this.handleEditButtonClick          = this.handleEditButtonClick.bind(this)
    this.handleSaveButtonClick          = this.handleSaveButtonClick.bind(this)
    this.handleMoveToTrashButtonClick   = this.handleMoveToTrashButtonClick.bind(this)
    this.handleDeleteForeverClick       = this.handleDeleteForeverClick.bind(this)
    this.handleRequestChipDelete        = this.handleRequestChipDelete.bind(this)
    this.handleAddParticipantButtonClick = this.handleAddParticipantButtonClick.bind(this)
    this.handleAddParticipant           = this.handleAddParticipant.bind(this)
    this.handleAddNoteClick             = this.handleAddNoteClick.bind(this)
    this.handleDeleteNoteClick          = this.handleDeleteNoteClick.bind(this)

    //Axios Route Functions
    this.getAllMeetingDocs              = this.getAllMeetingDocs.bind(this)
    this.deleteThisMeetingDoc           = this.deleteThisMeetingDoc.bind(this)
    this.updateThisMeetingDoc           = this.updateThisMeetingDoc.bind(this)
  }

  //--------------------------LifeCycle-----------------------------------------
  //----------------------------------------------------------------------------
  componentWillMount() {
    let sortObjVal = this.state.sortObj
    this.getAllMeetingDocs(sortObjVal);
  }

  //------------------------Event Handlers--------------------------------------
  //----------------------------------------------------------------------------
  handleSearchTextChange(inputValue) {
    this.setState({searchText: inputValue.toLowerCase()});
  }

  handleStarredChange (meetingID) {
    console.log(meetingID);
    var newDocArray = this.state.docArray;
    var targetMeeting = newDocArray.filter((meeting) => {
      return meeting._id === meetingID
    })

    targetMeeting[0].metaData.starred = (targetMeeting[0].metaData.starred ? false : true);

    this.setState({newDocArray});
    this.updateThisMeetingDoc(targetMeeting[0]);
  }

  handleFilterButtonClick(event) {
    this.setState({showFilterMenu: (this.state.showFilterMenu ? false : true)})
    this.setState({filterMenuAnchor: event.currentTarget})
  }

  handleSortButtonClick(event) {
    this.setState({showSortMenu: (this.state.showSortMenu ? false : true)})
    this.setState({sortMenuAnchor: event.currentTarget})
  }

  handleAddParticipantButtonClick(event) {
    this.setState({showParticipantMenu: (this.state.showParticipantMenu ? false : true)})
    this.setState({participantMenuAnchor: event.currentTarget})
  }

  handleAddParticipant(participant, meetingIndex) {
    let newDocArray = this.state.docArray;
    let newParticipantsPerMeeting = this.state.participantsPerMeeting;

    newDocArray[meetingIndex].participants.push(this.state.participantProfiles[participant])
    newParticipantsPerMeeting[meetingIndex].splice(0, 0, participant)

    this.setState({newDocArray})
    this.setState({newParticipantsPerMeeting})
  }

  handleAddNoteClick(noteType, meetingIndex) {
    let newDocArray = this.state.docArray;

    let newNote = {
      text: '',
      category: noteType,
      timeStamp: 0,
      formattedTimeStamp: 'added-post-meeting',
      metaData: {}
    }

    newDocArray[meetingIndex].notes.push(newNote)

    this.setState({newDocArray})
  }

  handleDeleteNoteClick(noteIndex, meetingIndex) {
    let newDocArray = this.state.docArray;
    newDocArray[meetingIndex].notes.splice(noteIndex, 1);
    this.setState({newDocArray})
  }

  handleSortByChange(event, value) {
    let newSortObj = this.state.sortObj;

    if (value === 'title' || value === 'location') {
      newSortObj.type = value;
      // Set default order to 'asc' for 'location' and 'title'
      newSortObj.order = 'asc';
    } else if (value === 'date') {
      newSortObj.type = value;
      newSortObj.order = 'desc';
    } else {
      // if the value is 'order'
      newSortObj.order === 'asc' ? newSortObj.order = 'desc' : newSortObj.order = 'asc';
    }
    this.setState({newSortObj});
    this.getAllMeetingDocs(newSortObj);
  }

  handleLocationFilterChange(event, target, value) {
    let filters = Object.assign({}, this.state.filters);
    filters.location = value;
    this.setState({filters});
  }

  handleParticipantFilterChange(event, target, value) {
    if(value.indexOf('Display All') > -1) {
      let filters = Object.assign({}, this.state.filters);
      filters.participants = [''];
      this.setState({filters});
    } else {
        let filters = Object.assign({}, this.state.filters);
        filters.participants = value;
        this.setState({filters});
      }
  }

  handleDateFromFilterChange(x, value) {
    // only the second attribute contains the date
    let filters = Object.assign({}, this.state.filters);
    filters.dateFrom = value;
    this.setState({filters});
  }

  handleDateToFilterChange(x, value) {
    let filters = Object.assign({}, this.state.filters);
    filters.dateTo = value;
    this.setState({filters});
  }

  handleClickClearFiltersButton() {
    let filters = Object.assign({}, this.state.filters);
    filters.location = 'Display All';
    filters.participants = [''];
    filters.dateFrom = null;
    filters.dateTo = new Date();
    this.setState({filters});
  }

  handleMeetingCardClick(event, targetMeetingID) {
    let meetingCardExpanded = Object.assign({}, this.state.meetingCardExpanded);

    meetingCardExpanded[targetMeetingID] = meetingCardExpanded[targetMeetingID] ? false : true;
    this.setState({meetingCardExpanded})
  }

  handleEditButtonClick(event, targetMeetingID) {
    let meetingCardEditEnabled = Object.assign({}, this.state.meetingCardEditEnabled);

    meetingCardEditEnabled[targetMeetingID] = meetingCardEditEnabled[targetMeetingID] ? false : true;

    this.setState({meetingCardEditEnabled})
  }

  handleMoveToTrashButtonClick(event, targetMeetingID) {

      var newDocArray = this.state.docArray;
      var targetMeeting = newDocArray.filter((meeting) => {
        return meeting._id === targetMeetingID
      })
      targetMeeting[0].metaData.trash = (targetMeeting[0].metaData.trash ? false : true);

      this.setState({newDocArray});
      this.updateThisMeetingDoc(targetMeeting[0]);

      // Turns off edit mode so that the card isn't expanded in trash folder
      let meetingCardEditEnabled = Object.assign({}, this.state.meetingCardEditEnabled);
      meetingCardEditEnabled[targetMeetingID] = false;
      this.setState({meetingCardEditEnabled})
  }

  handleDeleteForeverClick(event, targetMeetingIndex) {
    let confirmDelete = confirm("Are you sure you want to permanently delete this meeting? This action is irreversible!")
    if (confirmDelete) {
      var newDocArray = this.state.docArray
      var targetDocument = newDocArray[targetMeetingIndex]
      newDocArray.splice(targetMeetingIndex, 1)
      this.setState(newDocArray)
      var targetDocumentId = targetDocument._id
      this.deleteThisMeetingDoc(targetDocumentId)
    }
  }

  handleSaveButtonClick(event, targetMeetingID, targetMeetingIndex) {
    let meetingCardEditEnabled = Object.assign({}, this.state.meetingCardEditEnabled);
    meetingCardEditEnabled[targetMeetingID] = false;

    let newDocArray = this.state.docArray;

    let hasEmptyNote = true;
    while (hasEmptyNote) {
      let lastIndex = newDocArray[targetMeetingIndex].notes.length - 1;
      if (newDocArray[targetMeetingIndex].notes[lastIndex].text === '') {
        newDocArray[targetMeetingIndex].notes.pop()
      } else {
        hasEmptyNote = false
      }
    }

    let targetDocument = newDocArray[targetMeetingIndex]

    this.updateThisMeetingDoc(targetDocument)

    this.setState({meetingCardEditEnabled})
  }

  handleRequestChipDelete(event, targetMeetingIndex, participantIndex){
    let newDocArray = this.state.docArray;
    let newParticipantsPerMeeting = this.state.participantsPerMeeting;

    newDocArray[targetMeetingIndex].participants.splice(participantIndex, 1);
    newParticipantsPerMeeting[targetMeetingIndex].splice(participantIndex, 1);
    //
    this.setState({newDocArray})
    this.setState({newParticipantsPerMeeting})
  }

  handleTempChange (event, targetProperty, targetIndex, targetNoteIndex) {

    let newDocArray = this.state.docArray;

    switch(targetProperty){
      case 'location':
        newDocArray[targetIndex].location = event.target.value;
        this.setState(newDocArray)
        break;
      case 'title':
        newDocArray[targetIndex].title = event.target.value;
        this.setState(newDocArray)
        break;
      case 'note':
        newDocArray[targetIndex].notes[targetNoteIndex].text = event.target.value;
        this.setState(newDocArray)
        break;
    }
  }

  intializeStateVariables(docArrayVal) {
    // Getting all unique locations for filter menu
    let allPossibleLocations = [...new Set(docArrayVal.map((meeting) =>{
      return meeting.location;
    }))]

    // OPTIMIZE FROM HERE
    let possibleParticipants = docArrayVal.map((meeting) => {
      return meeting.participants.map((participant) => {
        return participant.fullName
      })
    })

    // Adding the hosts name to participants list
    for (var i = 0; i < possibleParticipants.length; i++) {
      possibleParticipants[i].push(docArrayVal[i].host.fullName)
    }

    let newArr = [];
    for(i = 0; i < possibleParticipants.length; i++) {
        newArr = newArr.concat(possibleParticipants[i]);
    }

    let uniqueParticipants = []
    newArr.map((participant) => {
      if (uniqueParticipants.includes(participant) === false) {
        uniqueParticipants.push(participant)
      }
    })

    let participantProfiles = {};
    for (var i = 0; i < uniqueParticipants.length; i++) {
      docArrayVal.map((meeting) => {
        meeting.participants.map((participant) => {
          if (participant.fullName === uniqueParticipants[i]) {
            participantProfiles[uniqueParticipants[i]] = participant
          }
        })
      })
      uniqueParticipants[i]
    }
    // OPTIMIZE TO HERE

    let meetingCardExpanded = {};
    docArrayVal.map((meeting) => {
      meetingCardExpanded[meeting._id] = false
    })

    let meetingCardSelected = {};
    docArrayVal.map((meeting) => {
      meetingCardSelected[meeting._id] = false
    })

    let meetingCardEditEnabled = {};
    docArrayVal.map((meeting) => {
      meetingCardEditEnabled[meeting._id] = false
    })

    this.setState({meetingCardExpanded})
    this.setState({meetingCardSelected})
    this.setState({meetingCardEditEnabled})
    this.setState({allLocations: allPossibleLocations})
    this.setState({allParticipants: uniqueParticipants})
    this.setState({participantsPerMeeting: possibleParticipants})
    this.setState({participantProfiles})
  }

  //-------------------------Axios Route Functions------------------------------
  //----------------------------------------------------------------------------
  getAllMeetingDocs (sortObjVal) {
    const self = this
    axios.post('http://localhost:8080/secure/meetingDocument/findByUser', {
      sortObj: sortObjVal
    })

    .then((docArrayResponse) => {
      var docArrayVal = docArrayResponse.data;
      // Reordered the meetings to display most recent first
      // docArrayVal.sort((a, b) => {
      //   return new Date(b.date) - new Date(a.date)
      // });

      this.intializeStateVariables(docArrayVal);
      this.setState({docArray: docArrayVal});

    })

    .catch((error) => {
      console.log('ERROR(getAllMeetingDocs): ' + error)
    })
  }

  deleteThisMeetingDoc (targetDocumentIdVal) {
    const self = this
    // Initialize the axios post route
    axios.post('http://localhost:8080/secure/meetingDocument/deleteById', {
      // include the target document's id
      targetDocumentId: targetDocumentIdVal
    })
    .then((successObject) => {
      // if the axios route isnt trying to retrieve an actual piece of data and
      // just sending a command, the server will return a
      // successObject = { success: Boolean, errorText: String}
      console.log(successObject)
      // a simple ternary expression that checks the success boolean in
      // successObject just to make sure everything went okay, if not it prints the error message
      successObject.data.success ? console.log('success') : console.log('something is up: ' + successObject.data.errorText)
    })
    .catch((error) => {
      // cant forget to print out the error of course in case things go south
      console.log('ERROR(deleteThisMeetingDoc): ' + error)
    })
  }

  updateThisMeetingDoc (targetDocumentVal) {
    const self = this
    console.log(targetDocumentVal);
    axios.post('http://localhost:8080/secure/meetingDocument/updateThisDocument', {
      // AGAIN, BECAREFUL - this needs to be an EXACT replica of the document
      // with the update
      targetDocument: targetDocumentVal
    })
    .then((successObject) => {
      // axios.post() routes that do not return a piece of data, will once again
      // return a successObject for checking
      console.log(successObject.data)
      successObject.data.success ? console.log('success') : console.log('something is up: ' + successObject.data.errorText)
    })
    .catch((error) => {
      // can't forget the console.log(error) to know if something is up -
      // how can you put out a fire without knowing its there right? lol
      console.log('ERROR(updateThisMeetingDoc): ' + error)
    })
  }


  render () {
    //---------------------------CONDITIONS-------------------------------------
    //--------------------------------------------------------------------------

    // FILTERING DISPLAYED MEETINGS --------------------------------------------
    let filteredDocArray = this.state.docArray.filter((meeting, index) => {
      let searchCondition = meeting.title.toLowerCase().indexOf(this.state.searchText) !== -1;
      let folderCondition = ((this.props.currentFolder == 'All Meetings' || (this.props.currentFolder == meeting.metaData.folder)) && !meeting.metaData.trash) || (meeting.metaData.trash && this.props.currentFolder === 'Trash');
      let starredCondition = (this.props.currentFolder == 'Starred Meetings' && meeting.metaData.starred);
      let locationFilter = ((this.state.filters.location === meeting.location) || this.state.filters.location === 'Display All');
      let allParticipantsInMeeting = true;
      for (let i=1; i < this.state.filters.participants.length; i++) {
        if (this.state.participantsPerMeeting[index].indexOf(this.state.filters.participants[i]) === -1) {
          allParticipantsInMeeting = false
          return allParticipantsInMeeting;
        }
      }
      let participantFilter = allParticipantsInMeeting || (this.state.filters.participants[0] === '');
      let dateFromFilter = (moment(meeting.date).isSameOrAfter(this.state.filters.dateFrom) || (this.state.filters.dateFrom === null));
      // Add a day to make it inclusive
      let dateToFilter = (moment(meeting.date).isSameOrBefore(moment(this.state.filters.dateTo).add(1, 'day')));
      let dateFilter = (dateToFilter && dateFromFilter);

      return searchCondition && (folderCondition || starredCondition) && locationFilter && participantFilter && dateFilter;
    });


    // NOTE Meeting names to populate searchbar autocomplete
    let filteredMeetingNames = filteredDocArray.map((meeting) => {
      return meeting.title
    })

    //---------------------------RETURN-----------------------------------------
    //--------------------------------------------------------------------------
    return (
      <div className="DocumentStorageMain">

        <DumbDocumentSearchbar
          onSearchTextChange={this.handleSearchTextChange}
          meetingNames={filteredMeetingNames}
        />

        <DumbDocumentFilterbar
          onFilterButtonClick       = {this.handleFilterButtonClick}
          showFilterMenu            = {this.state.showFilterMenu}
          filters                   = {this.state.filters}
          filterMenuAnchor          = {this.state.filterMenuAnchor}
          showSortMenu              = {this.state.showSortMenu}
          sortObj                   = {this.state.sortObj}
          sortMenuAnchor            = {this.state.sortMenuAnchor}
          onSortButtonClick         = {this.handleSortButtonClick}
          onSortByChange            = {this.handleSortByChange}
          allLocations              = {this.state.allLocations}
          onLocationFilterChange    = {this.handleLocationFilterChange}
          allParticipants           = {this.state.allParticipants}
          onParticipantFilterChange = {this.handleParticipantFilterChange}
          onDateToFilterChange      = {this.handleDateToFilterChange}
          onDateFromFilterChange    = {this.handleDateFromFilterChange}
          onClickClearFiltersButton = {this.handleClickClearFiltersButton}
        />
        <div className="DocumentStorageCardsWrapper" >
          <DumbDocumentMeetingCards
            filteredDocArray            = {filteredDocArray}
            docArray                    = {this.state.docArray}
            handleMeetingCardClick      = {this.handleMeetingCardClick}
            handleStarredChange         = {this.handleStarredChange}
            handleEditButtonClick       = {this.handleEditButtonClick}
            handleSaveButtonClick       = {this.handleSaveButtonClick}
            meetingCardExpanded         = {this.state.meetingCardExpanded}
            meetingCardEditEnabled      = {this.state.meetingCardEditEnabled}
            meetingCardSelected         = {this.state.meetingCardSelected}
            handleMoveToTrashButtonClick= {this.handleMoveToTrashButtonClick}
            handleTempChange            = {this.handleTempChange}
            handleDeleteForeverClick    = {this.handleDeleteForeverClick}
            handleRequestChipDelete     = {this.handleRequestChipDelete}
            allParticipants             = {this.state.allParticipants}
            participantsPerMeeting      = {this.state.participantsPerMeeting}
            showParticipantMenu         = {this.state.showParticipantMenu}
            participantMenuAnchor       = {this.state.participantMenuAnchor}
            handleAddParticipantButtonClick = {this.handleAddParticipantButtonClick}
            handleAddParticipant        = {this.handleAddParticipant}
            handleAddNoteClick          = {this.handleAddNoteClick}
            handleDeleteNoteClick       = {this.handleDeleteNoteClick}
            />
        </div>
      </div>
    );
  }
}

//-------------------------------PROP TYPES-------------------------------------
SmartDocumentMain.propTypes = {
  currentFolder:  PropTypes.string.isRequired,
};


// TODO, FIXME, CHANGED, XXX, IDEA, HACK, NOTE, REVIEW, NB, BUG, QUESTION, COMBAK, TEMP, DEBUG, OPTIMIZE
