import React from 'react'
import {Card, CardTitle} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const FileReview = ({data,changePane,save,toEmail,toPDF,handleRequestClose,newMeeting}) => (
  <Card className="dictation">
    <div className="head">
      <div style={{marginRight:'50px'}}>
        <h1>{data.title}</h1>
        <h2>{data.type}</h2>
        <h2>{data.location + ' on '+ data.date.toUTCString()}</h2>
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
    <div className="sections">
      <Card className="section">
        <CardTitle title="Decisions"/>
        <List>
          {data.decisions.map((item,index) =>
          <ListItem disabled={true} primaryText={item} key={Math.random()}/>
          )}
        </List>
      </Card>
      <Card className="section">
        <CardTitle title="Action Items"/>
        <List>
          {data.actions.map((item,index) =>
            <ListItem disabled={true} primaryText={item.phrase} key={Math.random()}/>
          )}
        </List>
      </Card>
      <Card className="section">
        <CardTitle title="General Notes"/>
        <List>
          {data.minutes.map((item,index) =>
            <ListItem disabled={true} primaryText={item} key={Math.random()}/>
          )}
        </List>
      </Card>
    </div>
    <div className="navButtons">
      <RaisedButton label="Return & Edit" primary={true} onClick={() => changePane('Dashboard')}/>
      <FlatButton label="Email" primary={true} onClick={toEmail}/>
      <div className='recommendedButton'>
        <FlatButton style={{margin: 0, padding: 0}} label="--> Download PDF <--" primary={true} onClick={toPDF}/>
        <p > RECOMMENDED</p>
      </div>
      <RaisedButton label="Save & Submit" primary={true} onClick={save}/>
    </div>
  </Card>
)
export default FileReview
