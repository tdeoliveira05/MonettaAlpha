import React from 'react'
import {Link} from 'react-router-dom'
import TextField from 'material-ui/TextField'
import {Card, CardTitle} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Dialog from 'material-ui/Dialog'

const Dictation = ({
	itemAdd,
	itemChange,
	itemDelete,
	helpOpen,
	helpClose,
	help,
	changeText,
	enterText,
	text, 
	changePane,
	data,
	transcript,
	isRecording
	}) => (

		<Card className="dictation">

			<div className="head">
				<div className="meta">
					<h1>{data.title}</h1>
					<h2>{data.type}</h2>
					<h2>{data.location + ' on '+ data.date.toDateString()}</h2>
					<h2>{data.date.toTimeString()}</h2>
				</div>

				<div>
					<h2>Members Present:</h2>
					<ul style={{listStyle:'none'}}>
						{data.members.map((member,index) =>
							<li key={index}>{member}</li>
						)}
					</ul>
				</div>
			</div>

			<div className='Help'>
				<RaisedButton label='Help' onTouchTap={helpOpen} />
				<p style={{marginRight: '30px'}}> Hold "Alt" on your keyboard to begin recording speech </p>
			</div>

			<div className="sections">

				<Card className="section">
					<h1 style={{margin: 0}}> Team Decisions </h1>
					<p style={{margin: 0, color: 'rgb(70,153,255)'}}> Activation word: "decision, decide, decided" </p>
					<List style={{margin: 5}}>
						{data.decisions.map((item,index) =>
							<div key={index} className="listItem">
								<TextField
					        className="field-line"
					        name="decisions"
									value={item}
									onChange={(event,newValue) => itemChange(newValue,index,'decisions')}
									multiLine={true}
									rows={1}
									rowsMax={4}
									style={{width: '100%'}}
					      />
								<p className='deleteButton' onClick={(e)=> itemDelete(item, index, e,'decisions')}>x</p>
							</div>
						)}
					</List>
					<div className='inputField'>
						<TextField
							floatingLabelText='Decisions (hit "Enter" to add a note)'
							name='decisions'
							value={text.decisions}
							multiLine={true}
							style={{width: '100%'}}
							onChange={changeText}
							onKeyPress={(ev) => {
								if (ev.key === 'Enter') {
									ev.preventDefault();
									enterText('decisions');
								}
							}}
						/>
					</ div>
				</Card>


				<Card className="section">
					<h1 style={{margin: 0}}> Action Items </h1>
					<p style={{margin: 0, color: 'rgb(70,153,255)'}}> Activation word: "action" </p>
					<List style={{margin: 5}}>
						{data.actions.map((item,index) =>
							<div key={index} className="listItem">
								<TextField
					        className="field-line"
					        name="actions"
									value={item.phrase}
									onChange={(event,newValue) => itemChange(newValue,index,'actions')}
									multiLine={true}
									rows={1}
      						rowsMax={4}
									style={{width: '100%'}}
					      />
								<p className='deleteButton' onClick={(e)=> itemDelete(item, index, e,'actions')}>x</p>
							</div>
						)}
					</List>
					<div className='inputField'>
						<TextField
							floatingLabelText='Actions (hit "Enter" to add a note)'
							name='actions'
							multiLine={true}
							value={text.actions}
							style={{width: '100%'}}
							onChange={changeText}
							onKeyPress={(ev) => {
								if (ev.key === 'Enter') {
									ev.preventDefault();
									enterText('actions');
								}
							}}
						/>
					</ div>
				</Card>
				<Card className="section">
					<h1 style={{margin: 0}}> General Notes </h1>
					<p style={{margin: 0, color: 'rgb(70,153,255)'}}>Activated by general speech</p>
					<List style={{margin: 5}}>
						{data.minutes.map((item,index) =>
							<div key={index} className="listItem">
								<TextField
					        className="field-line"
					        name="minutes"
									value={item}
									onChange={(event,newValue) => itemChange(newValue,index,'minutes')}
									multiLine={true}
									rows={1}
									rowsMax={4}
									style={{width: '100%'}}
					      />
								<p className='deleteButton' onClick={(e)=> itemDelete(item, index, e,'minutes')}>x</p>
							</div>
						)}
					</List>
					<div className='inputField'>
						<TextField
							floatingLabelText='(hit "Enter" to add a note manually)'
							name='minutes'
							multiLine={true}
							value={text.minutes}
							style={{width: '100%'}}
							onChange={changeText}
							onKeyPress={(ev) => {
								if (ev.key === 'Enter') {
									ev.preventDefault();
									enterText('minutes');
								}
							}}
						/>
					</ div>
				</Card>
			</div>

			<div className="navButtons">
				<RaisedButton label="Previous" primary={true} onClick={() => changePane('Info')}/>
				<div className="transcript">
					{isRecording == true &&
						<CircularProgress size={30} thickness={7} />
					}
					{transcript}
				</div>
				<RaisedButton label="Finish & Review" primary={true} onClick={() => changePane('Review')}/>
			</div>

			<Dialog
          modal={false}
          open={help}
					actions={<RaisedButton label="Close"  onClick={helpClose}/>}
          onRequestClose={helpClose}
					className="helpDialog"
        >
				<h1> Dictation feature: </h1>
        <p>
				 Hold down the "alt" key on your keyboard in order to start recording your speech.
				<br/>
				<br/>
				Unfortunately, due to the sensitivity of voice recognition please make sure to pronounce words clearly and at a modest pace (as if you are using a virtual assistant).
				Please visit the "Help" tab on the top right for more general information about the use of Monetta!
				</p>

				<h1> Note: </h1>
				<p>
				 You are able to enter your notes by simply typing it in the text field of your chosen category and clicking the "Enter" key on your keyboard or "Submit" next to the text field!
				<br/>
				</p>

				<br/>

				<h2 style={{color: 'rgb(255,172,77)'}}> For any issues please send us feedback by using the button on the top right of the screen!</h2>

        </Dialog>
		</Card>
	)

export default Dictation;
