import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import screen1 from '../../assets/images/help1.png';


const Help1 = () => (
  <Card style={{padding:"1vw"}}>
    <h1>The meeting information page</h1>
    <p>
      Here is where you can put in all of the inital information for your meeting.
      To add individual members, press 'Enter' on your keyboard to add each individual. When you are done you can click 'Start' to begin.
    </p>

    <Card>
      <CardMedia>
        <img src={screen1} alt="" />
      </CardMedia>
    </Card>
  </Card>
);

export default Help1;
