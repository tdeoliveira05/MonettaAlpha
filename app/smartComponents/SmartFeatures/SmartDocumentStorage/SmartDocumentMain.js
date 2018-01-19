import React from 'react';
import axios from 'axios'

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



const styles = {
  block: {
    height: 'auto',
    // display: 'flex',
  },
  cardHeader: {
    // display: "inline-block",
    // position: "relative",
    top: -48,
    left: 35,
    marginRight: 35,
    // maxWidth: 1300,
    // width: 1300,
  },
  cardIcon: {
    display: "inline-block",
    maxWidth: 25,
  },
};

export default class SmartDocumentMain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      docArray: []   // initialize the docArray property of this.state to be clear what you are expecting it to contain -> an array of things
    }

    this.getAllMeetingDocs = this.getAllMeetingDocs.bind(this)  // bind getAllMeetingDocs() to be used by the render() function through <RaisedButton/>
  }

  getAllMeetingDocs () {
    const self = this  // this tells axios that when you refer to any variables or functions, you are referring to this component as you function scope


    axios.post('http://localhost:8080/get/allMeetingDocs', this.props.userTokenObj) // initialize a post request and pass a user token so the server can validate the user and use the username to get all the relevant meetings. Remember that this is a "promise"
                                                                                    //  and has a specific structure of implementation (primarily the .then & .catch chain that follows it)
                                                                                    // visit App.js to change the seed data of the token obj or, better yet, create an account in your local database and just copy over the token values so that you dont have to re-login everytime the page refreshes

    .then((docArrayResponse) => {  // always remember to add the outputObject in the arrow function (outputObject) => {...}. index.js will tell you exactly what output object to expect for that route /get/allMeetingDocs

      var docArrayVal = docArrayResponse.data // this doesnt do much, just makes it neater and explicitly states that the stuff we are looking for is in outputObject.data, not anywhere else
                                              // keep in mind the outputObject - in this case docArrayResponse - actually has a ton of other properties than data, like .statusText and .request but right now you only need the ".data" property
      console.log(docArrayResponse)           // have a look at your console after you run this axios route to understand what the outputObject structure looks like. the actual content is again in the ".data" property


      this.setState({docArray: docArrayVal})  // sets the state to the outputObject.data, this overwrites any previous values in the docArray property in this.state, it ensures that everytime you run this axios.get route you will get a fresh array and lose the old one

    })
    .catch((error) => {                       // The final piece of a promise chain is a .catch block that will trigger if the promise fails (i.e. when outputObject.status !== 200)

      console.log('ERROR(axios)' + error)     // make sure you never forget to at least console.log(error) so that you know if the promise failed or not otherwise, without it, you would have no way of knowing
                                              // I should make a note at this point too that some times the promise can actually fail and go to the .then block instead of .catch, this will generally only happen if the failure was internal in the serverTools function
                                              // rather than the actual axios.get route, that means the promise could think it was a sucess but you might get bad data or no data at all - this is rare and its the job of the back-end dev to make sure it doesnt happen but be aware
    })
  }


  render () {

    /* Thiago's Additions
    //---------------------------CONDITIONS-------------------------------------  // Dont forget to add these comment indicators otherwise your render() function can get real messy
                                                                                  // Whenever i start a new smart component I just copy the boilet plate code in '../../BOILERPLATES' folder and rename the class_name variable

    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <h2>Main Content</h2>


        <RaisedButton                                     // random stuff but this is just showing how you would make use of the getAllMeetingDocs() function
          label = 'get files'                             // alternatively, instead of using a function you could of course place the function in a Lifecycle Function of this component so that its always updating
          onClick = {() => this.getAllMeetingDocs()}      // Keep in mind though that can slow down the component A LOT if you keep running axios over and over again. A good work around is simply to call the getAllMeetingDocs()
                                                          // in the Lifecyle Function called componentWillMount() since you can set your initial state before the component mounts for the first time.
                                                          // for more info on Lifecycle Functions (highly suggest you research them) https://alligator.io/react/lifecycle-functions/
                                                          // Lifecycle functions can be your best friend if you know them well due to their versatility. If you don't know them well though, they are the biggest nightmare to use since they are very fidgety...
        />

        {this.state.docArray.map((item, index) => {       // random .map() function to display the titles of each meeting returned after you click the <RaisedButton />
                                                          // .map() functions are super helpful to front-end devs since it lets you manipulate arrays easily. if you are not familiar with .map(), research it, its an awesome function
          console.log(item)                               // console.log() each item in the array of this.state.docArray
          return (
            <div key = {index}>
              <p> {item.title} </p>
            </div>
          )
        })}
      */


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
            <div className="MeetingPreviewCardWrapper" >
              <Card style={styles.block} className="MeetingPreviewCard">
                <CardActions>
                  <Checkbox
                    style={styles.cardIcon}
                    checkedIcon={<StarToggleON />}
                    uncheckedIcon={<StarToggleOFF />}
                  />
                  {/*<IconButton><MoreVertIcon/></IconButton>*/}
                </CardActions>
                <CardHeader
                  style={styles.cardHeader}
                  title={meetingName}
                  subtitle= "Meeting Date"
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
            </div>
      		)
    	});

    return (
      <div className="DocumentStorageCardsWrapper" >
        {meetingCards}
      </div>
    );
  }
}

// SmartDocumentMain.proptypes = {
// };
