import React from 'react'
import Link from 'react-router'
import {Card, CardTitle} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import TimePicker from 'material-ui/TimePicker'
import Divider from 'material-ui/Divider'
import Chip from 'material-ui/Chip'
import ChipInput from 'material-ui-chip-input'


const MeetingForm = ({ onChange, data, changePane}) => (
  <Card className="meeting">
    <h1> Create a new meeting: </h1>
      <TextField
        value={data.title}
        floatingLabelText="Title"
        name="title"
        underlineShow={false}
        onChange={onChange}
      /><Divider />
      <TextField
        value={data.type}
        floatingLabelText="Meeting Type"
        name="type"
        underlineShow={false}
        onChange={onChange}
      /><Divider />
      <TextField
        value={data.location}
        floatingLabelText="Location"
        name="location"
        underlineShow={false}
        onChange={onChange}
      /><Divider />
      <TimePicker
        value={data.date}
        hintText="Time"
        minutesStep={5}
        underlineShow={false}
        onChange={onChange}
      /><Divider />

      <ChipInput
        defaultValue={data.members}
        onChange={(chips) => onChange(null, null, chips)}
        floatingLabelText="Name of Participants (hit 'Enter' to add each individual)"
        style={{width: '400px'}}
      />
      <br/><br/>
      <RaisedButton label="Start" primary={true} onClick={() => changePane('Dashboard')}/>
  </Card>
);


export default MeetingForm;
