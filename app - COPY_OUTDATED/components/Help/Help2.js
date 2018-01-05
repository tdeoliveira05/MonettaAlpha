import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import screen2 from '../../assets/images/help2.png';


const Help2 = () => (
  <Card style={{padding:"1vw"}}>

    <h1> This is your meeting dashboard </h1>
    <p> Here you can add notes with our Speech to Text feature while holding down "Alt" on your keyboard.
    Note that you are still able to add notes by simply typing them into the text field of each respective category if you do not wish to use voice recognition!
    <br/><br/>
    When your meeting is done, click the "Finish & Review" button to continue.
    </p>
    <br/>
    <Card>
      <CardMedia>
        <img src={screen2} alt="" />
      </CardMedia>
    </Card>
  </Card>
);

export default Help2;
