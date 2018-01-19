import React from 'react'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'


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
      docArray: [],   // initialize the docArray property of this.state to be clear what you are expecting it to contain -> an array of things
      tempArray: [],  // an array to manage all of the different documents displayed, the index corresponds to docArray's index as well
      temp: '' // ignore this, this is just to show an error I talk about in comments in the .map() function inside render() {..}
    }

    this.handleTempChange = this.handleTempChange.bind(this)

    this.getAllMeetingDocs    = this.getAllMeetingDocs.bind(this)  // bind getAllMeetingDocs() to be used by the render() function through <RaisedButton/>

    this.deleteThisMeetingDoc = this.deleteThisMeetingDoc.bind(this)
    this.deleteThisMeetingDocArrayEntry = this.deleteThisMeetingDocArrayEntry.bind(this)

    this.updateThisMeetingDoc = this.updateThisMeetingDoc.bind(this)
    this.updateThisMeetingDocArrayEntry = this.updateThisMeetingDocArrayEntry.bind(this)
  }

  handleTempChange (event) {
    console.log(event.target.name + ' -----> ' + event.target.value)
    this.setState({[event.target.name]: event.target.value})
  }

  getAllMeetingDocs () {
    const self = this  // this tells axios that when you refer to any variables or functions, you are referring to this component as you function scope


    axios.post('http://localhost:8080/meetingDocument/findByUser', this.props.userTokenObj) // initialize a post request and pass a user token so the server can validate the user and use the username to get all the relevant meetings. Remember that this is a "promise"
                                                                                    //  and has a specific structure of implementation (primarily the .then & .catch chain that follows it)
                                                                                    // visit App.js to change the seed data of the token obj or, better yet, create an account in your local database and just copy over the token values so that you dont have to re-login everytime the page refreshes

    .then((docArrayResponse) => {  // always remember to add the outputObject in the arrow function (outputObject) => {...}. index.js will tell you exactly what output object to expect for that route /get/allMeetingDocs

      var docArrayVal = docArrayResponse.data // this doesnt do much, just makes it neater and explicitly states that the stuff we are looking for is in outputObject.data, not anywhere else
                                              // keep in mind the outputObject - in this case docArrayResponse - actually has a ton of other properties than data, like .statusText and .request but right now you only need the ".data" property
      console.log(docArrayResponse)           // have a look at your console after you run this axios route to understand what the outputObject structure looks like. the actual content is again in the ".data" property


      this.setState({docArray: docArrayVal})  // sets the state to the outputObject.data, this overwrites any previous values in the docArray property in this.state, it ensures that everytime you run this axios.get route you will get a fresh array and lose the old one

    })
    .catch((error) => {                       // The final piece of a promise chain is a .catch block that will trigger if the promise fails (i.e. when outputObject.status !== 200)

      console.log('ERROR(getAllMeetingDocs): ' + error)     // make sure you never forget to at least console.log(error) so that you know if the promise failed or not otherwise, without it, you would have no way of knowing
                                                  // I should make a note at this point too that some times the promise can actually fail and go to the .then block instead of .catch, this will generally only happen if the failure was internal in the serverTools function
                                                  // rather than the actual axios.get route, that means the promise could think it was a success but you might get bad data or no data at all - this is rare and its the job of the back-end dev to make sure it doesnt happen but be aware
    })
  }


  deleteThisMeetingDoc (targetDocumentIdVal) {
    const self = this
    axios.post('http://localhost:8080/meetingDocument/deleteById', {  // Initialize the axios post route
      targetDocumentId: targetDocumentIdVal,                          // include the target document's id
      userTokenObj: this.props.userTokenObj                           // always remember to include the user token object when making a server request in order to let the server authenticate the user
    })
    .then((successObject) => {
      console.log(successObject)                                     // if the axios route isnt trying to retrieve an actual piece of data and just sending a command, the server will return a successObject = { success: Boolean, errorText: String}
      successObject.data.success ? console.log('success') : console.log('something is up: ' + successObject.data.errorText) // a simple ternary expression that checks the success boolean in successObject just to make sure everything went okay, if not it prints the error message
    })
    .catch((error) => {
      console.log('ERROR(deleteThisMeetingDoc): ' + error)                      // cant forget to print out the error of course in case things go south
    })
  }

  deleteThisMeetingDocArrayEntry (index) {
    console.log(index)
    var newDocArray = this.state.docArray                  //Retrieve the current array of meetign documents
    var targetDocument = newDocArray[index]                //Store the target document from the variable newDocArray that was just declared, this will be used a couple of lines down


    newDocArray.splice(index, 1)                           //.splice() is an array method (aka. a function) that removes a number of array values relative to the index value that it requirements
                                                           // In this case, the line of code says "remove {1} item from the array starting at the position {index}". If the code was array.splice(index, 2) it would remove the first {2} values starting at {index}
                                                           // This line of code operates on the current array, such that after the engine runs that line of code, newDocArray no longer contains the target document at position newDocArray[index]
                                                           // This deletes the document locally. To delete the document in the server we use an axios.post() route

    this.setState(newDocArray)                             // update the local state variable docArray, now that the code has finished deleting the document locally in this.state.docArray, it has to delete it remotely from the database with the following lines of code

    var targetDocumentId = targetDocument._id              // store the id of the targetDocument to pass into the axios route
                                                           // Keep in mind, the id of the document is a default property given to EVERY mongoose document, and any default property that is automatically given will start with an undersocre --> "_id"
                                                           // if you did var targetDocumentId = targetDocument.id (without the underscore) the server would have no idea what you're talking about

    this.deleteThisMeetingDoc(targetDocumentId)            // send the target document's id to the axios route so it can destroy it from the database
                                                           // and voila, everything should be settled
  }



  updateThisMeetingDocArrayEntry (index) {

    console.log(index)
    console.log(this.state.temp)
    var newDocArray = this.state.docArray                 // same as before when we deleted a document, retrieve the current docArray stored in this.state so that you can manipulate it

    newDocArray[index].title += this.state.temp           // the operand '+=' will add something to its old version. For example, a += b is asking the computer to do a = a + b, this will add the this.state.temp string to the title in the target document

    this.setState(newDocArray)                            // overwrite the entire docArray with this new version

    var targetDocument = newDocArray[index]               // retrieve the ENTIRE target document to send to axios for it to update in the database


    this.updateThisMeetingDoc(targetDocument)             // BECAREFUL
                                                          // the premise behind the update route is to apss it the ENTIRE document, every single piece of it
                                                          // NOT only the updated pieces
                                                          // this axios.post() route will basically remove the old document and rpleace it with a new one
                                                          // if there are any missing properties from the target document, they will be PERMANENTLY localhost
                                                          // this is a security risk, treat it very carefully and test locally before deployment
  }


  updateThisMeetingDoc (targetDocumentVal) {
    const self = this
    axios.post('http://localhost:8080/meetingDocument/updateThisDocument', {
      targetDocument: targetDocumentVal,                               // AGAIN, BECAREFUL - this needs to be an EXACT replica of the document with the update
      userTokenObj: this.props.userTokenObj                             // as always, send the token with the request
    })                                                                // double check before deployment
    .then((successObject) => {
      console.log(successObject.data)                                         // axios.post() routes that do not return a piece of data, will once again return a successObject for checking
      successObject.data.success ? console.log('success') : console.log('something is up: ' + successObject.data.errorText)
    })
    .catch((error) => {
      console.log('ERROR(updateThisMeetingDoc): ' + error)                        // can't forget the console.log(error) to know if something is up - how can you put out a fire without knowing its there right? lol
    })
  }


  render () {

    /* Thiago's Additions
    //---------------------------CONDITIONS-------------------------------------  // Dont forget to add these comment indicators otherwise your render() function can get real messy
                                                                                  // Whenever i start a new smart component I just copy the boilet plate code in '../../BOILERPLATES' folder and rename the class_name variable

    //----------------------------RETURN----------------------------------------
    return(
      <div style = {{width: '100%'}}>
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

          return (
            <div key = {index} style = {{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <Paper style = {{display: 'flex', alignItems: 'center',justifyContent: 'space-around', width: '400px', padding: '10px'}}>
                <p> {item.title} </p>
                <RaisedButton
                  label = 'x'
                  onClick = {() => this.deleteThisMeetingDocArrayEntry(index)}
                />
              </Paper>
              <Paper style = {{display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center', width: '400px', padding: '10px'}}>

              <TextField
                value = {this.state.temp}                                       // NOTE NOTE NOTE this field here is going to cause every text field to be filled with the same value you type. This is just a quick way for me to show you how the update route works, you would implement
                                                                                // a better way to do this of course if you were focusing on creating the actual front end for use, rahter than for testing
                name = 'temp'                                                   // exact key of a temporary storage property in this.state that I will use
                hintText = 'add words to the title'                             // this text field will let us fill in this.state.temp and when the user clicks 'update title' in <RaisedButton /> below, we will update the title of the target meeting document
                onChange = {this.handleTempChange}                              // after we update it locally using this.updateThisMeetingDocArrayEntry(), we will update it remotely too by passing the new meeting document to this.updateThisMeetingDoc() to send a command to the server
              />
              <RaisedButton
                label = 'update title'
                onClick = {() => this.updateThisMeetingDocArrayEntry(index)}    // the prompt button to initiate the update chain
              />

              </Paper>
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

/*
<RadioButton
        value="ludicrous"
        label="Custom icon"
        checkedIcon={<ActionFavorite style={{color: '#F44336'}} />}
        uncheckedIcon={<ActionFavoriteBorder />}
        style={styles.radioButton}
      />
*/
