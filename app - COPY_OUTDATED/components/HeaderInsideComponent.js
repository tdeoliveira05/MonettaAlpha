import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import Snackbar from 'material-ui/Snackbar'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'

const HeaderInsideComponent = ({
	handlePTerms,
	handleLogoClick,
	feedbackButton,
	logo,
	openFeedback,
	changeParentState,
	handleRequestClose,
	sent,
	issue,
	suggestion,
	likes,
	sendFeedback,
	openQuestion,
	handleQuestion,
	questionAndAnswer
}) => (

	<div className="header" style={{width:'100%'}}>
		<div className='topBar'>
			<FlatButton label='Privacy & Terms' labelStyle={{color: 'white'}}  onClick={handlePTerms}/>
			<button className='Button' onClick={handleLogoClick}><img src={logo} className='Logo'/></button>
			<RaisedButton label="Send Feedback" secondary={true} onClick={feedbackButton} />
		</div>
		<Drawer
			open={openFeedback}
			docked={false}
			onRequestChange={feedbackButton}
			width={'20%'}
			containerClassName="drawer"
			>
			<Subheader>Send us your Feedback!</Subheader>
			<TextField
				hintText="Issues"
				multiLine={true}
				rows={1}
				rowsMax={10}
				name='issue'
				value={issue}
				onChange={changeParentState}
				style={{width:'16vw'}}
			/>
			<TextField
				hintText="Suggestions"
				multiLine={true}
				rows={1}
				rowsMax={10}
				name='suggestion'
				value={suggestion}
				onChange={changeParentState}
				style={{width:'16vw'}}
			/>
			<TextField
				hintText="Likes"
				multiLine={true}
				rows={1}
				rowsMax={10}
				name='likes'
				value={likes}
				onChange={changeParentState}
				style={{width:'16vw'}}
			/>
			<FlatButton
				label="Send"
				primary={true}
				onClick={sendFeedback}
				fullWidth={true}
			/>
		</Drawer>
		<Snackbar
			open={sent}
			message="Thank you for the feedback!"
			autoHideDuration={4000}
			onRequestClose={handleRequestClose}
				/>
		<Dialog modal={false} open={openQuestion} onRequestClose={handleQuestion} autoScrollBodyContent={true}>
			{questionAndAnswer}
		</Dialog>
	</div>

)

export default HeaderInsideComponent
