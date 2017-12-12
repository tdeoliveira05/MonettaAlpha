import React from 'react'
import axios from 'axios'

import FeedbackComponent from '../components/FeedbackComponent.js'


export default class Feedback extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			feedback:[],
			users:[],
			userCount:0
		}
		this.getFeedback = this.getFeedback.bind(this)
		this.getUsers = this.getUsers.bind(this)
	}
	componentDidMount(){
		const self = this;
		axios.get('http://localhost:3000/usercount')
			.then(function(res) {
				self.setState({
          userCount:res.data
        })
			})
			.catch(function(error) {
				console.log(error)
			})
	}

  getFeedback() {
		const self = this;
		axios.get('http://localhost:3000/feedback')
			.then(function(res) {
				self.setState({
          feedback:res.data
        })
				console.log('Got Feedback')
			})
			.catch(function(error) {
				console.log(error)
			})
	}
	getUsers() {
		const self = this;
		console.log('Get Users')
		axios.get('http://localhost:3000/users')
			.then(function(res) {
				self.setState({
          users:res.data
        })
				console.log('Got Users')
			})
			.catch(function(error) {
				console.log(error)
			})
	}

  render() {
  		return (
  				<div>
						<FeedbackComponent
							getFeedback={this.getFeedback}
							getUsers={this.getUsers}
							userCount={this.state.userCount}
							feedback={this.state.feedback}
							users={this.state.users}
						/>
  				</div>
  			)
  	}
  }
