/************************** SERVER CALLS PRESENT*****************************/
import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class ReusableSmartFeedback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedbackVal: '',
      errorText: ''
    }

    this.submitFeedback     = this.submitFeedback.bind(this)
    this.handleChange       = this.handleChange.bind(this)
    this.checkForError      = this.checkForError.bind(this)
  }

  submitFeedback () {
    const self = this
    axios.post('http://localhost:8080/secure/feedbackDocument/submit', {
      feedback: {
        message: this.state.feedbackVal,
        location: this.props.location.pathname
      }
    })
    .then((successObj) => {
      console.log(successObj)
      successObj.data.success ? this.setState({snackOpen: true}) : console.log(successObj.data.errorText)
      if (this.props.successFunction) this.props.successFunction()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  checkForError () {
    if (this.state.feedbackVal === '') {
      this.setState({errorText: 'Type your feedback into this text field!'})
    } else {
      console.log('submitting feedback')
      this.submitFeedback()
    }
  }

  handleChange (event) {
    if (this.state.feedbackVal !== '') this.setState({errorText: ''})
    this.setState({feedbackVal: event.target.value})
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    console.log('feedback')
    console.log(this.props)
    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <Paper style = {{width: '100%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 10px 20px 10px', textAlign: 'center'}}>
          <h2> We're eager to hear what you think of Monetta! </h2>
          <div>
            <TextField
              hintText = 'Enter feedback here'
              name = 'feedbackVal'
              value = {this.state.feedbackVal}
              onChange = {this.handleChange}
              rows = {1}
              rowsMax = {3}
              multiLine = {true}
              errorText = {this.state.errorText}
            />
          </div>
          <div>
            <RaisedButton
              label = 'Send'
              secondary
              onClick = {this.checkForError}
            />
          </div>
        </Paper>
      </div>

    )
  }
}

export default withRouter(ReusableSmartFeedback)
