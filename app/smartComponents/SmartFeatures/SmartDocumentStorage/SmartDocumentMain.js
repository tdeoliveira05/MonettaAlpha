import React      from 'react';
import axios      from 'axios';
import PropTypes  from 'prop-types';
import moment     from 'moment';


import DumbDocumentSearchbar    from '../../../dumbComponents/DocumentStorage/DumbDocumentSearchbar.js';
import DumbDocumentFilterbar    from '../../../dumbComponents/DocumentStorage/DumbDocumentFilterbar.js';
import DumbDocumentMeetingCards from '../../../dumbComponents/DocumentStorage/DumbDocumentMeetingCards.js';



// Importing Material-UI Components
import IconButton   from 'material-ui/IconButton';
import IconMenu     from 'material-ui/IconMenu';
import FontIcon     from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton   from 'material-ui/FlatButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem     from 'material-ui/MenuItem';
import TextField    from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Checkbox     from 'material-ui/Checkbox';
import Paper        from 'material-ui/Paper';
import Chip         from 'material-ui/Chip';


// Importing Material-UI SVG-Icons
import MoreVertIcon   from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon       from 'material-ui/svg-icons/navigation/menu';
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import SortIcon       from 'material-ui/svg-icons/content/sort';
import StarToggleON   from 'material-ui/svg-icons/toggle/star';
import StarToggleOFF  from 'material-ui/svg-icons/toggle/star-border';



export default class SmartDocumentMain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      docArray: [], // Refer to models/meetingModel
      tempArray: [],
      temp: '',
      searchText: '',
      showFilterMenu: false,
      sortMenuAnchor: {},
      filterMenuAnchor: {},
      filters: {
        location: 'Display All',
        participants:  [''],
        dateFrom: null,
        dateTo:   new Date()
      },
      showSortMenu: false,
      sortBy: 'DateDesc',
      allLocations: [],
      allParticipants: [],
      participentsPerMeeting: [],
      meetingPreviewCards: [
        // {
        //   meetingID: string,
        //   expanded:  boolean,
        //   selected:  boolean,
        //   allowEdit: boolean,
        // }
      ],
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
    this.handleCancelEditButtonClick    = this.handleCancelEditButtonClick.bind(this)

    //Axios Route Functions
    this.getAllMeetingDocs              = this.getAllMeetingDocs.bind(this)
    this.deleteThisMeetingDoc           = this.deleteThisMeetingDoc.bind(this)
    this.deleteThisMeetingDocArrayEntry = this.deleteThisMeetingDocArrayEntry.bind(this)
    this.updateThisMeetingDoc           = this.updateThisMeetingDoc.bind(this)
    this.updateThisMeetingDocArrayEntry = this.updateThisMeetingDocArrayEntry.bind(this)
  }

  //--------------------------LifeCycle-----------------------------------------
  //----------------------------------------------------------------------------
  componentWillMount() {
    this.getAllMeetingDocs();
  }

  //------------------------Event Handlers--------------------------------------
  //----------------------------------------------------------------------------
  handleSearchTextChange(inputValue) {
    this.setState({searchText: inputValue.toLowerCase()});
  }

  handleStarredChange (meetingID) {
    // Can't use index to identify target meeting because .filter() restarts index
    // console.log(meetingID);
    var newDocArray = this.state.docArray;
    var targetMeeting = newDocArray.filter((meeting) => {
      return meeting._id === meetingID
    })

    targetMeeting[0].metaData.starred = (targetMeeting[0].metaData.starred ? false : true) ;

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

  handleSortByChange(event, value) {
    this.setState({sortBy: value})
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
    console.log(this.state.meetingCardExpanded)
  }

  handleEditButtonClick(event, targetMeetingID) {
    let meetingCardEditEnabled = Object.assign({}, this.state.meetingCardEditEnabled);

    meetingCardEditEnabled[targetMeetingID] = meetingCardEditEnabled[targetMeetingID] ? false : true;

    this.setState({meetingCardEditEnabled})
    console.log(this.state.meetingCardEditEnabled)
  }

  handleCancelEditButtonClick(event, targetMeetingID) {
    let meetingCardEditEnabled = Object.assign({}, this.state.meetingCardEditEnabled);

    meetingCardEditEnabled[targetMeetingID] = false;

    this.setState({meetingCardEditEnabled})

    console.log('You pressed the cancel button but nothing really happend')
  }

  handleSaveButtonClick(event, targetMeetingID) {
    console.log('You pressed the save button but nothing got saved')
  }

  // determineMeetingCardStyle(meetingTargetID) {
  //   let index = this.state.meetingPreviewCards.findIndex((meeting) => {
  //     meeting.meetingID = meetingTargetID
  //   })
  //   if (this.state.meetingPreviewCards[index].expanded) {
  //     return this.styles.expandedCard
  //   } else {
  //     return this.styles.unExpandedCard
  //   }
  // }



  handleTempChange (event) {
    console.log(event.target.name + ' -----> ' + event.target.value)
    this.setState({[event.target.name]: event.target.value})
  }

  //-------------------------Axios Route Functions------------------------------
  //----------------------------------------------------------------------------
  getAllMeetingDocs () {
    const self = this

    axios.post('http://localhost:8080/meetingDocument/findByUser', this.props.userTokenObj)

    .then((docArrayResponse) => {

      var docArrayVal = docArrayResponse.data

      // Reordered the meetings to display most recent first
      docArrayVal.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
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
      for(var i = 0; i < possibleParticipants.length; i++) {
          newArr = newArr.concat(possibleParticipants[i]);
      }

      let uniqueParticipants = []
      newArr.map((participant) => {
        if (uniqueParticipants.includes(participant) === false) {
          uniqueParticipants.push(participant)
        }
      })
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
      this.setState({participentsPerMeeting: possibleParticipants})
      this.setState({docArray: docArrayVal})

    })

    .catch((error) => {
      console.log('ERROR(getAllMeetingDocs): ' + error)
    })
  }

  deleteThisMeetingDocArrayEntry (index) {
    console.log(index)
    //Retrieve the current array of meetign documents
    var newDocArray = this.state.docArray
    //Store the target document from the variable newDocArray that was just
    // declared, this will be used a couple of lines down
    var targetDocument = newDocArray[index]

    //.splice() is an array method (aka. a function) that removes a number of
    // array values relative to the index value that it requirements
    // In this case, the line of code says "remove {1} item from the array
    // starting at the position {index}". If the code was array.splice(index, 2)
    // it would remove the first {2} values starting at {index}
    // This line of code operates on the current array, such that after the engine
    // runs that line of code, newDocArray no longer contains the target document at position newDocArray[index]
    // This deletes the document locally. To delete the document in the server we use an axios.post() route
    newDocArray.splice(index, 1)

    // update the local state variable docArray, now that the code has finished
    // deleting the document locally in this.state.docArray, it has to delete it
    // remotely from the database with the following lines of code
    this.setState(newDocArray)

    // store the id of the targetDocument to pass into the axios route
    // Keep in mind, the id of the document is a default property given to
    // EVERY mongoose document, and any default property that is automatically
    // given will start with an undersocre --> "_id"
    // if you did var targetDocumentId = targetDocument.id (without the underscore)
    // the server would have no idea what you're talking about
    var targetDocumentId = targetDocument._id

    // send the target document's id to the axios route so it can destroy it from the database
    // and voila, everything should be settled
    this.deleteThisMeetingDoc(targetDocumentId)
  }

  deleteThisMeetingDoc (targetDocumentIdVal) {
    const self = this
    // Initialize the axios post route
    axios.post('http://localhost:8080/meetingDocument/deleteById', {
      // include the target document's id
      targetDocumentId: targetDocumentIdVal,
       // always remember to include the user token object when making a
       // server request in order to let the server authenticate the user
      userTokenObj: this.props.userTokenObj
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

  updateThisMeetingDocArrayEntry (index) {

    console.log(index)
    console.log(this.state.temp)
    // same as before when we deleted a document, retrieve the current docArray
    // stored in this.state so that you can manipulate it
    var newDocArray = this.state.docArray

    // the operand '+=' will add something to its old version. For example,
    // a += b is asking the computer to do a = a + b, this will add the
    // this.state.temp string to the title in the target document
    newDocArray[index].title += this.state.temp

    // overwrite the entire docArray with this new version
    this.setState(newDocArray)

    // retrieve the ENTIRE target document to send to axios for it to update in the database
    var targetDocument = newDocArray[index]
    console.log(targetDocument);

    // BECAREFUL
    // the premise behind the update route is to pass it the ENTIRE document,
    // every single piece of it NOT only the updated pieces
    // this axios.post() route will basically remove the old document and replace it with a new one
    // if there are any missing properties from the target document, they will be PERMANENTLY localhost
    // this is a security risk, treat it very carefully and test locally before deployment
    this.updateThisMeetingDoc(targetDocument)
  }


  updateThisMeetingDoc (targetDocumentVal) {
    const self = this
    axios.post('http://localhost:8080/meetingDocument/updateThisDocument', {
      // AGAIN, BECAREFUL - this needs to be an EXACT replica of the document
      // with the update
      targetDocument: targetDocumentVal,
      // as always, send the token with the request
      userTokenObj: this.props.userTokenObj
      // double check before deployment
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
      let folderCondition = (this.props.currentFolder == 'All Meetings' || (this.props.currentFolder == meeting.metaData.folder));
      let starredCondition = (this.props.currentFolder == 'Starred Meetings' && meeting.metaData.starred);
      let locationFilter = ((this.state.filters.location === meeting.location) || this.state.filters.location === 'Display All');
      let allParticipantsInMeeting = true;
      for (let i=1; i < this.state.filters.participants.length; i++) {
        if (this.state.participentsPerMeeting[index].indexOf(this.state.filters.participants[i]) === -1) {
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

    // SORTING DISPLAYED MEETINGS ----------------------------------------------
    switch(this.state.sortBy) {
      case 'DateDesc':
        filteredDocArray.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
        })
        break
      case 'DateAsc':
        filteredDocArray.sort((a, b) => {
          return new Date(a.date) - new Date(b.date)
        })
        break
      case 'MeetingDesc':
        filteredDocArray.sort((a, b) => {
          return b.title.toLowerCase() > a.title.toLowerCase()
        })
        break
      case 'MeetingAsc':
        filteredDocArray.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase()
        })
        break
      case 'LocDesc':
        filteredDocArray.sort((a, b) => {
          return b.location.toLowerCase() > a.location.toLowerCase()
        })
        break
      case 'LocAsc':
        filteredDocArray.sort((a, b) => {
          return a.location.toLowerCase() > b.location.toLowerCase()
        })
        break
    }

    // NOTE Meeting names to populate searchbar autocomplete
    let filteredMeetingNames = filteredDocArray.map((meeting) => {
      return meeting.title
    })

    const meetingPaperStyle = this.state.docArray.map((item, index) => {
      return(
        <div key={index} style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'}}>
          <Paper style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '400px',
            padding: '10px'}}>

            <p> {item.title} </p>
            <RaisedButton
              label = 'x'
              onClick = {() => this.deleteThisMeetingDocArrayEntry(index)}
            />
          </Paper>
          <Paper style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '400px',
            padding: '10px'}}>

          <TextField
            value = {this.state.temp}
            name = 'temp'
            hintText = 'add words to the title'
            onChange = {this.handleTempChange}
          />
          <RaisedButton
            label = 'update title'
            onClick = {() => this.updateThisMeetingDocArrayEntry(index)}
          />

          </Paper>
        </div>
      );
    });

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
          sortBy                    = {this.state.sortBy}
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
            handleMeetingCardClick      = {this.handleMeetingCardClick}
            handleStarredChange         = {this.handleStarredChange}
            handleEditButtonClick       = {this.handleEditButtonClick}
            handleCancelEditButtonClick = {this.handleCancelEditButtonClick}
            handleSaveButtonClick       = {this.handleSaveButtonClick}
            meetingCardExpanded         = {this.state.meetingCardExpanded}
            meetingCardEditEnabled      = {this.state.meetingCardEditEnabled}
            meetingCardSelected         = {this.state.meetingCardSelected}
            />
        </div>

        <div>
          <RaisedButton
            label = 'Get All Docs'
            onClick = {() => this.getAllMeetingDocs()}
          />
        </div>

        <div style = {{width: '100%', paddingBottom: '100px'}}>
          {meetingPaperStyle}
        </div>

      </div>
    );
  }
}

//-------------------------------PROP TYPES-------------------------------------
SmartDocumentMain.propTypes = {
  currentFolder:  PropTypes.string.isRequired,
  userTokenObj:   PropTypes.object.isRequired,
};


{/*NOTE NOTE NOTE this field here is going to cause every*/}
{/*text field to be filled with the same value you type. This*/}
{/*is just a quick way for me to show you how the update*/}
{/*route works, you would implement*/}
{/*a better way to do this of course if you were focusing on*/}
{/*creating the actual front end for use, rahter than for testing*/}
{/*exact key of a temporary storage property in this.state
that I will use*/}
{/*this text field will let us fill in this.state.temp and
when the user clicks 'update title' in <RaisedButton />
below, we will update the title of the target meeting document*/}
{/*after we update it locally using this.updateThisMeetingDocArrayEntry(),
we will update it remotely too by passing the new meeting
document to this.updateThisMeetingDoc() to send a command to the server*/}
 {/*the prompt button to initiate the update chain*/}
// TODO, FIXME, CHANGED, XXX, IDEA, HACK, NOTE, REVIEW, NB, BUG, QUESTION, COMBAK, TEMP, DEBUG, OPTIMIZE
