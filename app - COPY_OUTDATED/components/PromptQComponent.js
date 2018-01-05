import React from 'react'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const PromptQComponent = ({likes, issues, suggestions, changeParentState, sendFeedback}) => (
  <div className='PromptQComponent'>
    <div className='PromptWrapper'>
      <h1> Any feedback for us? </h1>
      <Card className='PromptCard'>
        <div>
          <TextField
            floatingLabelText="Issues"
            multiLine={true}
            rows={3}
            rowsMax={10}
            name='issues'
            value={issues}
            onChange={changeParentState}
          />
        </div>
        <TextField
          floatingLabelText="Suggestions"
          multiLine={true}
          rows={3}
          rowsMax={10}
          name='suggestions'
          value={suggestions}
          onChange={changeParentState}
        />
        <TextField
          floatingLabelText="Likes"
          multiLine={true}
          rows={3}
          rowsMax={10}
          name='likes'
          value={likes}
          onChange={changeParentState}
        />

        <RaisedButton
          label='Send us your comments'
          secondary={true}
          onClick={sendFeedback}
          style={{margin: '20px'}}
          />
      </Card>
    </div>
  </div>
)

export default PromptQComponent;
