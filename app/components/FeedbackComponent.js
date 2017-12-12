import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {Tab, Tabs} from 'material-ui/Tabs'

const FeedbackComponent = ({getFeedback, userCount, feedback, getUsers, users}) => (
  <Tabs>
    <Tab label="Users">
      <FlatButton label="Get Users" fullWidth={true} onClick={getUsers} />
      {userCount}
      {users.map((user, index)=>
        <Card key={index}>
          <CardHeader
            title={user.username}
            subtitle={'Meetings: ' + user.meetingCount + ', Minutes: '+(user.time/60000)}
          />
        </Card>
      ).reverse()}
    </Tab>
    <Tab label="Feedback">
      <FlatButton label="Get Feedback" fullWidth={true} onClick={getFeedback} />
      {feedback.map((feedback,index)=>
        <Card key={index}>
          <CardHeader
            title={feedback.username}
            subtitle={(new Date(feedback.date)).toString()}
          />
          <CardText>
            {'Suggestions: ' +feedback.suggestion}
          </CardText>
          <CardText>
            {'Issues: ' +feedback.issue}
          </CardText>
          <CardText>
            {'Likes: ' +feedback.likes}
          </CardText>
        </Card>
      ).reverse()}
    </Tab>
  </Tabs>
)

export default FeedbackComponent;
