import React from 'react'
import {withRouter} from 'react-router-dom'

const DumbAdminData = ({
  dataBucket
}) => (
  <div className = 'AdminDataWrapper'>
    <div className = 'AdminDataContent'>

      <h1> User Data </h1>
      <div className = 'DataCards'>
        <div className = 'DataSnippet'>
          <h3> User Count </h3>
          <p> {dataBucket.userCount} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Weekly Active Users </h3>
          <p> {dataBucket.weeklyActiveUsers} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Monthly Active Users </h3>
          <p> {dataBucket.monthlyActiveUsers} </p>
        </div>
      </div>

      <h1> Meeting Data </h1>
      <div className = 'DataCards'>
        <div className = 'DataSnippet'>
          <h3> Total meetings on Monetta </h3>
          <p> {dataBucket.meetingCount} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Average meeting length </h3>
          <p> {dataBucket.averageLengthOfMeetings + ' mins'} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Total meetings last month </h3>
          <p> {dataBucket.meetingsHeldLastMonth} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Total meetings last week </h3>
          <p> {dataBucket.meetingsHeldLastWeek} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Average action items per meeting </h3>
          <p> {dataBucket.averageActionItemsPerMeeting} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Average decisions per meeting </h3>
          <p> {dataBucket.averageDecisionsPerMeeting} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Average general notes per meeting </h3>
          <p> {dataBucket.averageGeneralNotePerMeeeting} </p>
        </div>
      </div>
      <h1> General Data </h1>
      <div className = 'DataCards'>
        <div className = 'DataSnippet'>
          <h3> Number of requested features  </h3>
          <p> {dataBucket.userRequestedFeatures} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Number of feedback messages </h3>
          <p> {dataBucket.userFeedbackMessages} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Accumulated time of all users in app </h3>
          <p> {dataBucket.accumulatedTimeInApp + ' mins'} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Accumulated time of all users in meetings </h3>
          <p> {dataBucket.accumulatedTimeInMeetings + ' mins'} </p>
        </div>
        <div className = 'DataSnippet'>
          <h3> Accumulated speech recognition </h3>
          <p> {dataBucket.accumulatedTimeInSTT + ' mins'} </p>
        </div>
      </div>

      <div className = 'DataList'>
        <div className = 'DataListCol'>
          <h3> Alpha Organizations </h3>
          {dataBucket.alphaJobList.map((jobListItem) => {
            return (
              <div className = 'DataJobListItem'>
                <div style = {{width: '50%', textAlign: 'right'}}>
                  <p style = {{paddingRight: '5px', borderRight: '1px solid gray'}}> {jobListItem.organization} </p>
                </div>
                <div style = {{width: '50%'}}>
                  <p style = {{paddingLeft: '5px', borderLeft: '1px solid gray'}}> {jobListItem.jobPosition} </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>
);


// To implement prop-types:
/*

import React        from 'react';
import PropTypes    from 'prop-types';

const DumbAdminData = (props) => {

  let propName = props.propName;

  return (
    <div>

    </div>
  );
};

DumbAdminData.propTypes = {
  propName:     PropTypes.type.isRequired,
};

*/

export default withRouter(DumbAdminData)
