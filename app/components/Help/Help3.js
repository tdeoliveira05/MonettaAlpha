import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import screen3 from '../../assets/images/help3.png';


const Help3 = () => (
  <Card style={{padding:"1vw"}}>
    <h1> Reviewing your notes is important </h1>
    <p>
      The review page will show you the finalized version of your notes.
      If you would like to edit your notes you can click the 'Return & Edit' button to go back to the meetign dashboard to edit notes.
      You can save the meeting by saving it as a PDF and email it using the respective buttons.
      <br /><br />
      We recommend you save the PDF to your computer to access your notes while offline!
    </p>
    <Card>
      <CardMedia>
        <img src={screen3} alt="" />
      </CardMedia>
    </Card>
  </Card>
);

export default Help3;
