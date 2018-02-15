import React from 'react'
import {withRouter} from 'react-router-dom'
import date from 'date-and-time'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

const DumbAdminUsers = ({
  userList,
  search,
  onChange,
  meetingList,
  userCount,
  expandVoteHistory,
  expandFeatureRequestHistory,
  expandFeedbackHistory
}) => (
  <div className = 'AdminUsersWrapper'>
    <div className = 'AdminUsersContent'>
      <input value = {search} name = 'search' onChange = {onChange} style = {{marginBottom: '10px'}}/>
      <h1 style = {{marginBottom: '20px'}}> {'Total user count: ' + userCount} </h1>
      {userList.map((userItem, index) => {
        return (
          <div className = 'AdminUsersCard' key = {index}>
            <div className = 'UserHeading'>
              <div className = 'UserHeadingDiv'>
                <h1> {userItem.firstName + ' ' + userItem.lastName} </h1>
                <p> {'Last login: ' + date.format(new Date(userItem.lastLoggedIn), 'MMM DD - hh:mm A')} </p>
              </div>
              <div className = 'UserHeadingDiv'>
                <h3> {userItem.jobPosition + ' at ' + userItem.organization} </h3>
                <p> {'Sign up code used: ' + userItem.codeUsed} </p>
              </div>
              <div className = 'UserHeadingDiv'>
                <h3> {userItem.username} </h3>
                <p> {'Admin: ' + userItem.admin} </p>
              </div>
            </div>

            <div className = 'Divider'></div>

            <div className = 'UserInfoSnippets'>
              <div className = 'InfoSnippet'>
                <h2> Total in-App minutes </h2>
                <h3> {Math.floor(userItem.data.appUsage.totalTimeInApp/60000) + ' mins'} </h3>
              </div>
              <div className = 'InfoSnippet'>
                <h2> Meetings Held </h2>
                <h3> {userItem.data.appUsage.totalMeetingsHeld}</h3>
              </div>
              <div className = 'InfoSnippet'>
                <h2> Time In Meetings Held </h2>
                <h3> {Math.floor(userItem.data.appUsage.timeInMeetingsHeld/60000) + ' mins'} </h3>
              </div>
              <div className = 'InfoSnippet'>
                <h2> Total STT minutes </h2>
                <h3> {Math.floor(userItem.data.appUsage.totalSpeechRecognitionTime/60000) + ' mins'} </h3>
              </div>
              <div className = 'InfoSnippet'>
                <h2> Custom Meetings Held </h2>
                <h3> {userItem.data.appUsage.totalCustomMeetingsHeld} </h3>
              </div>
              <div className = 'InfoSnippet'>
                <h2> Time In Custom Meetings </h2>
                <h3> {Math.floor(userItem.data.appUsage.timeInCustomMeetingsHeld/60000) + ' mins'} </h3>
              </div>
            </div>

            <div className = 'Divider'></div>

            <div className = 'UserFooter'>
              <Card className = 'FooterCardUnit'>
                <CardHeader title = 'See vote history' actAsExpander = {true} showExpandableButton = {true}/>

                <CardText expandable = {true} className = 'ExpandedCardList'>

                  {userItem.data.userHistory.voteHistory.map((voteItem, voteIndex) => {
                    return (
                      <div className = 'FooterCard'>
                        <h2> {voteItem.featureTitle} </h2>
                        <p> {'user voted: ' + voteItem.userVote} </p>
                      </div>
                    )
                  })}
                </CardText>
              </Card>
              <Card className = 'FooterCardUnit'>
                <CardHeader title = 'See feature request history' actAsExpander = {true} showExpandableButton = {true}/>

                <CardText expandable = {true} className = 'ExpandedCardList'>

                  {userItem.data.userHistory.featureRequestHistory.map((featureItem, featureIndex) => {
                    return (
                      <div className = 'FooterCard'>
                        <h2> {featureItem.title } </h2>
                        <p>{' - requested on (' + date.format(new Date(featureItem.requestedOn), 'MMM DD - hh:mm A') + ')'}</p>
                        <p> {'user voted: ' + featureItem.description} </p>
                      </div>
                    )
                  })}
                </CardText>
              </Card>
              <Card className = 'FooterCardUnit'>
                <CardHeader title = 'See feedback history' actAsExpander = {true} showExpandableButton = {true}/>

                <CardText expandable = {true} className = 'ExpandedCardList'>

                  {userItem.data.userHistory.feedbackHistory.map((feedbackItem, feedbackIndex) => {
                    return (
                      <div className = 'FooterCard'>
                        <h2> {'created on (' + date.format(new Date(feedbackItem.sentOn), 'MMM DD - hh:mm A') + ')'} </h2>
                        <p> {' - ' + feedbackItem.location + ' - ' + feedbackItem.message} </p>
                      </div>
                    )
                  })}
                </CardText>
              </Card>

            </div>
          </div>
        )
      })}
    </div>
  </div>
);


// To implement prop-types:
/*

import React        from 'react';
import PropTypes    from 'prop-types';

const DumbAdminUsers = (props) => {

  let propName = props.propName;

  return (
    <div>

    </div>
  );
};

DumbAdminUsers.propTypes = {
  propName:     PropTypes.type.isRequired,
};
<h3> {'Code used: '} <br/> {userItem.codeUsed} </h3>
<br/>
<h3> {'last login: '} <br/> {date.format(new Date(userItem.lastLoggedIn), 'MMM DD - hh:mm A')} </h3>
<br/>
<h3> {'total minutes spent inside the app: '} <br/> {userItem.data.appUsage.totalMinutes} </h3>
<br/>
<h3> {'total minutes of speech recognition used: '} <br/> {userItem.data.appUsage.totalMinutes} </h3>

*/

export default withRouter(DumbAdminUsers)
