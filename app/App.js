import React from 'react'
import axios from 'axios'
import {Tab, Tabs} from 'material-ui/Tabs'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import List from 'material-ui/List'
import Snackbar from 'material-ui/Snackbar'

import Header from './containers/Header.js'
import FooterComponent from './components/FooterComponent.js'
import PrivacyTermsComponent from './components/PrivacyTermsComponent.js'
import Meeting from './containers/Meeting.js'
import Repository from './containers/Repository.js'
import Help from './containers/Help.js'
import Feedback from './containers/Feedback.js'
import PromptQComponent from './components/PromptQComponent.js'
import HomeComponent from './components/HomeComponent'
import LoginComponent from './components/LoginComponent.js'
import SignupComponent from './components/SignupComponent.js'
import AlphaUserComponent from './components/AlphaUserComponent.js'



export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: 'colin',
      date: '',
      issues: '',
      suggestions: '',
      likes: '',
      page: 'Home',
      tabValue: 'a',
      code: '',
      PTermsAct: false,
      data: {},
      promptFb: false,
      openFeedback:false,
      sent: false,
      loggedin: false,
      alphaActivation: false,

      tempEmail: '',
      tempEmailVal: '',
      logSig: '',
      loginSignupDialog: false,
      formUsername: '',
      formPassword: '',
      formCode: '',
      errors: {},
      tempUsername: '',
      alphaFirstName: '',
      alphaLastName: '',
      alphaEmail: '',
      alphaPosition: '',
      alphaCompany: '',
      alphaReferencer: '',
      recipientsOpen: false,
      recipientsTemp: '',
      recipients: [],
      snackOpen: false,
		}

    this.handlePageChange=this.handlePageChange.bind(this)
    this.handleTabChange=this.handleTabChange.bind(this)
    this.enterLogin = this.enterLogin.bind(this)
    this.hasRefresh=this.hasRefresh.bind(this)
    this.handlePTerms=this.handlePTerms.bind(this)
    this.handlePromptFb=this.handlePromptFb.bind(this)
    this.sendFeedback=this.sendFeedback.bind(this)
    this.changeParentState=this.changeParentState.bind(this)
    this.handleAlphaActivation=this.handleAlphaActivation.bind(this)
    this.changeTempEmail=this.changeTempEmail.bind(this)
    this.submitTempEmail=this.submitTempEmail.bind(this)
    this.handleLogSigActivate=this.handleLogSigActivate.bind(this)
    this.cleanUpForms=this.cleanUpForms.bind(this)
    this.handleLoginSubmit=this.handleLoginSubmit.bind(this)
    this.handleSignupSubmit=this.handleSignupSubmit.bind(this)
    this.handleSigButton=this.handleSigButton.bind(this)
    this.handleLogButton=this.handleLogButton.bind(this)
    this.changeTempUsername=this.changeTempUsername.bind(this)
    this.sendAlphaEmail=this.sendAlphaEmail.bind(this)

    this.prepareEmail=this.prepareEmail.bind(this)
    this.itemAdd=this.itemAdd.bind(this)
    this.itemChange=this.itemChange.bind(this)
    this.itemDelete=this.itemDelete.bind(this)
    this.changeText=this.changeText.bind(this)
    this.toEmail=this.toEmail.bind(this)

	}

  handleLoginSubmit () {
    // this function submits the login request and proceeds if sucessful by updating App.js and receiving new props as a result
    const self = this;
		axios.post('https://monettatech.com/login',
        {
				username: self.state.formUsername,
				password: self.state.formPassword
        }
			)
			.then (function(res) {
        if(res.data != 'User not found'){
          var errors = self.state.errors;
          errors.username = "";
          self.setState( {errors:errors} )
        }

        if (res.data != 'User Exists') {
          var errors = self.state.errors;
          errors.password = "";
          self.setState( {errors:errors} )
        }

				if(res.data != 'User not found' && res.data != 'User Exists'){
          self.enterLogin(self.state.formUsername)
          self.cleanUpForms()
          //self.props.history.push('/home')
				} else if(res.data == 'User not found') {
          var errors = self.state.errors;
          errors.username = "User not found";
          self.setState( {errors:errors} )

        } else if(res.data == 'User Exists'){
            var errors = self.state.errors;
            errors.password = "Password does not match";
            self.setState( {errors:errors} )
        }

			})
			.catch(function(error) {
				console.log(error)
		  })
  }

  handleSignupSubmit() {
    // this function handles sign up which updates App.js and receives new props as a result
    const self = this;
		axios.post('https://monettatech.com/signup',
			{
				username: self.state.formUsername,
				password: self.state.formPassword,
        code: self.state.formCode
			}
			)
			.then(function(res) {
        if(res.data != 'User Exists'){
          var errors = self.state.errors;
          errors.email = "";
          self.setState({
              errors:errors
          })
        }
        if(res.data != 'Sign Up Unsuccessful'){
          var errors = self.state.errors;
          errors.password = "";
          self.setState({
              errors:errors
          })
        }
				if(res.data != 'Sign Up Unsuccessful' && res.data != 'User Exists' && res.data !="Code Already Used" && res.data !="Code Doesn't Exist"){
          self.enterLogin(self.state.formUsername)
          self.cleanUpForms()
          //self.props.history.push('/home')
				} else if(res.data == 'User Exists') {
          var errors = self.state.errors;
          errors.email = "User Already Exists";
          self.setState({
              errors:errors
          })
        } else if(res.data == "Code Already Used"){
          var errors = self.state.errors;
          errors.code = "Code Already Used";
          self.setState({
              errors:errors
          })
        } else if(res.data == "Code Doesn't Exist"){
          var errors = self.state.errors;
          errors.code = "Code Doesn't Exist";
          self.setState({
              errors:errors
          })
        } else {
            var errors = self.state.errors;
            errors.password = "Account didn't save properly";
            self.setState({
                errors:errors
            })
        }

			})
			.catch(function(error) {
				console.log(error)
			})

  }

  sendAlphaEmail () {
    const self = this
    axios.post('https://monettatech.com/emailNewAlphaUser', {
      firstName: self.state.alphaFirstName,
      lastName: self.state.alphaLastName,
      email: self.state.alphaEmail,
      position: self.state.alphaPosition,
      company: self.state.alphaCompany,
      reference: self.state.alphaReference
    }).then (function(res) {
      console.log('done')
    }).catch (function (err) {
      console.log(err)
    })
  }

  toEmail(data) {
    const self = this
    axios.post('https://monettatech.com/emailMonettaMinutes',{
      title: self.state.data.title,
      type: self.state.data.type,
      location: self.state.data.location,
      date: self.state.data.date,
      members: self.state.data.members,
      decisions: self.state.data.decisions,
      actions: self.state.data.actions,
      minutes: self.state.data.minutes,
      recipients: self.state.recipients
    }).then(function(result){
      self.setState({recipientsTemp: '', recipients: [], snackOpen: true})
      self.prepareEmail()
      console.log('sent email')
    }).catch(function(err){
      console.log(err)
    })
  }

  itemAdd(){
    var newArray = this.state.recipients
    newArray.unshift(this.state.recipientsTemp)
    this.setState({recipients: newArray, recipientsTemp: ''})
  }

  itemChange(item, index){
    var newArray = this.state.recipients
    newArray[index] = item
    this.setState({recipients: newArray})
  }

  itemDelete(index){
    var newArray = this.state.recipients
    newArray.splice(index,1)
    this.setState({recipients: newArray});
  }

  changeText (e) {
    this.setState({recipientsTemp: e.target.value});
  }

  prepareEmail (dataVal) {
    if (this.state.recipientsOpen === false){
      this.setState({recipientsOpen: true, data: dataVal})
    } else {
      this.setState({recipientsOpen: false, data: {} })
    }
  }


  handleSigButton () {
    this.setState({logSig: 'signup'})
  }

  handleLogButton () {
    this.setState({logSig: 'login'})
  }

  submitTempEmail () {
    this.setState({tempEmailVal: this.state.tempEmail})
  }

  changeTempEmail (event) {
    this.setState({tempEmail: event.target.value})
    console.log('tempEmailVal: ' + this.state.tempEmailVal)
  }

  handlePageChange (pg) {
    this.setState({page:pg});
  }

  handleTabChange (tabVal, bool) {
    this.setState({tabValue:tabVal});

    if (bool == true) {
      this.setState({code: 'refresh'})
    }
  }

  hasRefresh () {
      this.setState({code: ''})
  }

  cleanUpForms () {

  }

  enterLogin (user) {
    this.setState({page: 'App', username: user, loggedin: true});
  }

  handlePTerms () {
    this.setState({PTermsAct: !this.state.PTermsAct})
  }

  handleAlphaActivation () {
    this.setState({alphaActivation: !this.state.alphaActivation})
  }

  handlePromptFb () {
    this.setState({promptFb: !this.state.promptFb});
  }

  changeParentState (event) {
    this.setState({[event.target.name]: event.target.value});
  }


  changeTempUsername (event) {
    this.setState({tempUsername: event.target.value, alphaEmail: event.target.value})
  }

  handleLogSigActivate (val) {
    this.setState({
      loginSignupDialog: !this.state.loginSignupDialog,
      logSig: val
    })
    console.log(this.state.tempUsername)
  }


  sendFeedback () {
    const self = this;
    axios.post('https://monettatech.com/feedback', {
        username: self.state.username,
        date: (new Date()).toString(),
        issue: self.state.issues,
        suggestion: self.state.suggestions,
        likes: self.state.likes
        }
    )
    .then(function(res) {
      self.setState({
        issues:'',
        suggestions:'',
        likes:''
        })
      }
    )
    .catch(function(error) {
      }
    )
    this.handlePromptFb()
  }

  render() {
    let feedbackTab = null;

    let PTerms = null;

    let promptFeedback = (
      <Dialog modal={false} open={this.state.promptFb} onRequestClose={this.handlePromptFb} autoScrollBodyContent={true}>
          <PromptQComponent
            issues={this.state.issues}
            suggestions={this.state.suggestions}
            likes={this.state.likes}
            changeParentState={this.changeParentState}
            sendFeedback={this.sendFeedback}
            />
      </Dialog>
    );

    let EmailDiag = (
      <div>
      <div className='EmailDialog'>
        <Dialog modal={false} open={this.state.recipientsOpen} onRequestClose={this.prepareEmail}>
          <h1> Please enter recipient emails</h1>
          <div className='inputField'>
            <TextField
              floatingLabelText='Emails (hit "Enter" to add an email)'
              name='recipientsTemp'
              multiLine={true}
              value={this.state.recipientsTemp}
              style={{width: '100%'}}
              onChange={this.changeText}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  this.itemAdd();
                }}}
            />
          </div>
          <List>
            {this.state.recipients.map((item, index) =>
              <div key={index} className='recipientEmail' style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}}>
                <TextField
                  name='recipients'
                  value={item}
                  onChange={(event,newValue) => this.itemChange(newValue, index)}
                  style={{width: '60%'}}
                  />
                <p onClick={(e) => this.itemDelete(index)}>x</p>
              </div>
            )}
          </List>
          <div>
            <RaisedButton label='Send Email' onClick={this.toEmail} primary={true}/>
          </div>
        </Dialog>
      </div>
      <Snackbar
        open={this.state.snackOpen}
        message={'Email Sent!'}
        autoHideDuration={4000}
        onRequestClose={()=> this.setState({snackOpen: false})}
        contentStyle={{display: 'flex', justifyContent: 'center'}}
        />
      </div>
    );

    if(this.state.username == 'colin' || this.state.username == 'team@monettatech.com'){
      feedbackTab = (
        <Tab label='Admin' value='d'>
          <Feedback />
        </Tab>
      )
    }

    if (this.state.PTermsAct) {
      PTerms = (
        <Dialog modal={false} open={this.state.PTermsAct} onRequestClose={this.handlePTerms} autoScrollBodyContent={true}>
          <div>
            <PrivacyTermsComponent />
          </div>
        </Dialog>
      )
    }

    if (this.state.logSig === 'login') {
      var LogSigComponent = (

        <Dialog style={{width: '100%'}} autoScrollBodyContent={true} modal={false} open={this.state.loginSignupDialog} onRequestClose={() => this.handleLogSigActivate('login')}>
          <LoginComponent
            handleLoginSubmit = {this.handleLoginSubmit}
            onChange = {this.changeParentState}
            username = {this.state.formUsername}
            password = {this.state.formPassword}
            errors = {this.state.errors}
            handleSigButton = {this.handleSigButton}
          />
        </Dialog>

      )
    } else if (this.state.logSig === 'signup'){
      var LogSigComponent = (

        <Dialog style={{width: '100%'}} autoScrollBodyContent={true} modal={false} open={this.state.loginSignupDialog} onRequestClose={() => this.handleLogSigActivate('login')}>
          <SignupComponent
            handleSignupSubmit={this.handleSignupSubmit}
            handleLogSigActivate={this.handleLogSigActivate}
            onChange={this.changeParentState}
            username={this.state.formUsername}
            password={this.state.formPassword}
            code={this.state.formCode}
            errors={this.state.errors}
            handleLogButton={this.handleLogButton}
            tempUsername={this.state.tempUsername}
          />
        </Dialog>
      )
    } else {
      var LogSigComponent = (
        <Dialog style={{width: '100%'}} autoScrollBodyContent={true} modal={false} open={this.state.loginSignupDialog} onRequestClose={() => this.handleLogSigActivate('login')}>
          <AlphaUserComponent
          onChange={this.changeParentState}
          firstName={this.state.alphaFirstName}
          lastName={this.state.alphaLastName}
          email={this.state.alphaEmail}
          position={this.state.alphaPosition}
          company={this.state.alphaCompany}
          reference={this.state.alphaReference}
          tempUsername={this.state.tempUsername}
          sendAlphaEmail={this.sendAlphaEmail}
          />
        </Dialog>
      )
    }

    //**   RETURN STATEMENT   **//
    switch (this.state.page) {
      case 'Home':
        return(
        <div>

          <Header
            loggedin={this.state.loggedin}
            username={this.state.username}
            handlePageChange={this.handlePageChange}
            inside={false}
            enterLogin={this.enterLogin}
            handlePTerms={this.handlePTerms}
            handleLogSigActivate={this.handleLogSigActivate}
            />

          <HomeComponent
            handleAlphaActivation = {this.handleAlphaActivation}
            alphaActivation = {this.state.alphaActivation}
            formUsername = {this.state.formUsername}
            handleLogSigActivate = {this.handleLogSigActivate}
            tempUsername = {this.state.tempUsername}
            changeTempUsername = {this.changeTempUsername}

            />
          <FooterComponent handlePTerms={this.handlePTerms}/>
          {PTerms}
          {LogSigComponent}
        </div>
      )

      case 'App':
      return(
        <div>

           <Header
              loggedin={this.state.loggedin}
              username={this.state.username}
              inside={true}
              page={this.state.page}
              enterLogin={this.enterLogin}
              handlePageChange={this.handlePageChange}
              handlePTerms={this.handlePTerms}
              />

           <Tabs value={this.state.tabValue} onChange={this.handleTabChange}>
             <Tab label="New Meeting" value='a'>
               <Meeting
                username={this.state.username}
                handleDirectToRepo={this.handleTabChange}
                handlePromptFb={this.handlePromptFb}
                prepareEmail={this.prepareEmail}
                />
             </Tab>
             <Tab label="My Meetings" value='b'>
               <Repository
                username={this.state.username}
                code={this.state.code}
                handleRefresh={this.hasRefresh}
                prepareEmail={this.prepareEmail}
                />
               {promptFeedback}
             </Tab>
             <Tab label="Help" value='c'>
               <Help />
             </Tab>
             {feedbackTab}
           </Tabs>
           {PTerms}
           {EmailDiag}

        </div>
      )

      case 'Sandbox':
      return(
        <div>
          <RaisedButton label='Test Email' onClick={this.testEmail} />
        </div>
      )
    }
  }
}
