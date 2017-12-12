import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import screen4 from '../../assets/images/help4.png';


const Help4 = () => (
  <Card style={{padding:"1vw"}}>
    <h1>Your team repository </h1>
    <p>
      From here you can search, delete, print, or email any of your past meetings.
      You can search by member or by title between any two dates. Just enter the info and press 'Enter' to search.
      If you want to bring up all of your meetings simple search with nothing typed into the search field!
      <br /> <br />
      Future updates will involve allowing your whole team to access this repository from their accounts but currently your account repository can only be viewed through your account.
    </p>
    <Card>
      <CardMedia>
        <img src={screen4} alt="" />
      </CardMedia>
    </Card>
  </Card>
);

export default Help4;
