import React from 'react'
import axios from 'axios'
import Dialog from 'material-ui/Dialog'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'


import HeaderComponent from '../components/HeaderComponent.js'
import HeaderInsideComponent from '../components/HeaderInsideComponent.js'
import MonettaLogo from '../assets/images/MonettaLogo.png'
import MonettaLogoNotif from '../assets/images/MonettaLogoNotif.png'
const PromptQuestions = require('./Data/PromptQuestions.js')


export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginSignupDialog: false,
      logSig: 'login',
      errors: {},
      issue:'',
			suggestion:'',
			likes:'',
      openFeedback:false,
      sent: false,
      logoClick: 'Notif',
      openQuestion: false,
      questionStr: '',
      questionAnswerScore: 0,
      questionAnswerText: '',
      answeredQs: [],
      answersLeft: true,
      answeredPrompt: false,
      errors: {},
      defaultEmailAct: false
      }
    this.handleHome=this.handleHome.bind(this)
    this.changeParentState = this.changeParentState.bind(this)
		this.sendFeedback = this.sendFeedback.bind(this)
    this.feedbackButton = this.feedbackButton.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleNotifSubmit=this.handleNotifSubmit.bind(this)
    this.handleQuestion=this.handleQuestion.bind(this)
    this.handleLogoClick=this.handleLogoClick.bind(this)
    this.handleAnswerScoreChange=this.handleAnswerScoreChange.bind(this)
    this.handleAnswerTextChange=this.handleAnswerTextChange.bind(this)
    this.loadQs=this.loadQs.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loggedin && !this.state.answeredPrompt ) {
      this.loadQs(nextProps.username)
    }
  }

  loadQs (loggedUser) {
    // this function updates the question string in the state depending on the state of the user's schema
    const self = this;
    axios.post('https://monettatech.com/loadqs',{
      username: loggedUser
    }).then(function(result){
      if (result.data.promptqs.length >= PromptQuestions.length) {
        self.setState({answersLeft: false, logoClick: 'Home'})
      } else if (result.data === 'no user found') {
        console.log('user error')
      } else {
        self.setState({ questionStr: PromptQuestions[result.data.promptqs.length][1], answeredQs: result.data.promptqs})
      }
    }).catch(function(error){
      console.log(error)
    })
  }



  sendFeedback () {
    // this function sends feedback to DB and Slack and activates a snackbar if sucessful
  	const self = this;
    console.log(self.state)
  	axios.post('https://monettatech.com/feedback', {
  			username: self.props.username,
  			date: (new Date()).toString(),
        likes: 'NOTIFICATION PROMPT',
        suggestion: 'QUESTION - ' + self.state.questionStr,
        issue: 'ANSWER (Score: ' + self.state.questionAnswerScore + ') - ' + self.state.questionAnswerText,
  		  }
    )
  	.then(function(res) {
      self.cleanUpQuestions()
  		console.log('Feedback Sent')
  	  }
    )
  	.catch(function(error) {
      console.log(error)
  	  }
    )
  	this.setState({openFeedback: false})
    this.setState({sent: true})
  }
  cleanUpQuestions () {
    console.log('cleanupquestions')
    this.setState({questionAnswerText: '', questionAnswerScore: 0})
  }

  changeParentState (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  feedbackButton () {
    this.setState({openFeedback: !this.state.openFeedback});
  }

  handleRequestClose () {
    this.setState({sent: false});
  }

  handleHome () {
    this.props.handlePageChange('Home');
  }

  handleNotifSubmit() {
    // this function sends the new question number to update the database, notifies the app that the user has answered the prompt question
    // closes the prompt dialog and switches the logo notification to route to home after the user has answered
    // it also sends feedback in a premade format shown below for each question
    const self = this;
    let newNumber = self.state.answeredQs.length
    let oldArray = self.state.answeredQs
    let answeredQsNew = [oldArray.concat(newNumber)]
    self.setState({
      logoClick: 'Home',
      answeredPrompt: true,
      answeredQs: answeredQsNew
    })
    axios.post('/updateqs', {
      username: self.props.username,
      newNumber: newNumber
    }).then(function(result){
      // console.log(result)
    }).catch(function(err){
      console.log(err)
    })
    self.handleQuestion()
    self.sendFeedback()
  }

  handleLogoClick () {
    if (this.state.logoClick == 'Home') {
      this.handleHome()
    } else if (this.state.logoClick == 'Notif') {
      this.setState({openQuestion: true})
    }
  }

  handleQuestion () {
    this.setState({openQuestion: !this.state.openQuestion});
  }

  handleAnswerScoreChange (event, index, value) {
    this.setState({questionAnswerScore: value})
  }
  handleAnswerTextChange (event, index, value) {
    this.setState({questionAnswerText: event.target.value})
  }

  render () {
    let logo = {}

    if (this.state.logoClick == 'Home') {
      logo = MonettaLogo
    } else if (this.state.logoClick == 'Notif') {
      logo = MonettaLogoNotif
    }

    var questionAndAnswer = (
      <div className='QuestionAndAnswer'>
        <div>
          <h1> {this.state.questionStr} </h1>
          <p> Great quality or no issues = 5 <br/> Low quality or many issues = 1 </p>
        </div>
        <div>
          <SelectField
            floatingLabelText="Rate out of 5"
            value={this.state.questionAnswerScore}
            onChange={this.handleAnswerScoreChange}
          >
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={4} primaryText="4" />
            <MenuItem value={5} primaryText="5" />
          </SelectField>
        </div>
        <div>
          <TextField
            hintText='Additional Comments'
            fullwidth={true}
            rows={2}
            rowsMax={4}
            multiLine={true}
            value={this.state.questionAnswerText}
            onChange={this.handleAnswerTextChange}
            />
        </div>
        <div>
          <RaisedButton label='Submit' onClick={this.handleNotifSubmit} primary={true}/>
        </div>
      </div>
    )



    switch (this.props.inside) {
      case true:
      return (
        <div>
          <HeaderInsideComponent
            username={this.props.username}
            page={this.state.page}
            feedbackButton={this.feedbackButton}
            openFeedback={this.state.openFeedback}
            onChange={this.changeParentState}
            issue={this.state.issue}
            suggestion={this.state.suggestion}
            likes={this.state.likes}
            sendFeedback={this.sendFeedback}
            handlePTerms={this.props.handlePTerms}
            handleHome={this.handleHome}
            changeParentState={this.changeParentState}
            sendFeedback={this.sendFeedback}
            sent={this.state.sent}
            handleRequestClose={this.handleRequestClose}
            questionAndAnswer={questionAndAnswer}
            openQuestion={this.state.openQuestion}
            handleQuestion={this.handleQuestion}
            handleLogoClick={this.handleLogoClick}
            logo={logo}
            />
        </div>
      )

      case false:
      return (
        <div>
          <HeaderComponent
            handleLogSigActivate={this.props.handleLogSigActivate}
            />
        </div>
      )
    }
  }
}
