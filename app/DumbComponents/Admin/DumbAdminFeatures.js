import React from 'react'
import {withRouter} from 'react-router-dom'
import date from 'date-and-time'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

const DumbAdminFeatures = ({
  onChange,
  changeFeatureItem,
  featureList,
  targetType,
  tempNotApprovedTitle,
  tempNotApprovedDescription
}) => (
  <div className = 'AdminFeaturesWrapper'>
    <div className = 'AdminFeaturesContent'>
      {featureList.map((featureItem, featureIndex) => {
        // render different interactive footer structures depending on targetType and show different voting info
        var footerStructure, votingInfo

        switch (targetType) {
          case 'notApproved':
            footerStructure = (
              <div style = {{width: '100%', height: '100%'}}>
                <h3> Final Title: </h3>
                <input type = 'text' value = {tempNotApprovedTitle} onChange = {onChange} name = 'tempNotApprovedTitle'/>
                <h3> Final Description: </h3>
                <textarea value = {tempNotApprovedDescription} onChange = {onChange} name = 'tempNotApprovedDescription'> </textarea>
                <div className = 'FeatureFooterButtons'>
                  <button onClick = {() => changeFeatureItem(featureItem._id, 'removed')}> Remove </button>
                  <button onClick = {() => changeFeatureItem(featureItem._id, 'approved')}> Approve </button>
                </div>
              </div>
            )
            break

          case 'approved':
            votingInfo = (
              <div className = 'FeatureBody'>
                <h3> {'total votes: ' + featureItem.totalVotes} </h3>
                <h3> Comments: </h3>
                {featureItem.comments.map((commentItem, commentIndex) => {
                  return (
                    <div style = {{width: '100%', height: '100%'}}>
                      <div className = 'Divider' style = {{width: '200px'}}></div>
                      <p style = {{fontWeight: 'bold'}}> {commentItem.fullname + ' (' + date.format(new Date(commentItem.timestamp), 'MMM DD - hh:mm A') + ')'} </p>
                      <p> {commentItem.username} </p>
                      <p> {commentItem.text} </p>
                      <br/>
                    </div>
                  )
                })}
              </div>
            )
            footerStructure = (
              <div style = {{width: '100%', height: '100%'}}>
                <div className = 'FeatureFooterButtons'>
                  <button onClick = {() => changeFeatureItem(featureItem._id, 'removed')}> Remove </button>
                  <button onClick = {() => changeFeatureItem(featureItem._id, 'finished')}> Finished </button>
                </div>
              </div>
            )
            break

          case 'removed':
            footerStructure = (
              <div style = {{width: '100%', height: '100%'}}>
                <h1> None </h1>
              </div>
            )
            break

          case 'finished':
            votingInfo = (
              <div className = 'FeatureBody'>
                <h3> {'total votes: ' + featureItem.totalVotes} </h3>
                <h3> Comments: </h3>
                {featureItem.comments.map((commentItem, commentIndex) => {
                  return (
                    <div style = {{width: '100%', height: '100%'}}>
                      <div className = 'Divider' style = {{width: '200px'}}></div>
                      <p style = {{fontWeight: 'bold'}}> {commentItem.fullname + ' (' + date.format(new Date(commentItem.timestamp), 'MMM DD - hh:mm A') + ')'} </p>
                      <p> {commentItem.username} </p>
                      <p> {commentItem.text} </p>
                      <br/>
                    </div>
                  )
                })}
              </div>
            )
            footerStructure = (
              <div style = {{width: '100%', height: '100%'}}>
                <h1> None </h1>
              </div>
            )
            break
        }


        return (
          <div className = 'FeatureCard'>
            <div className = 'Divider'></div>
            <h1> {featureItem.title + ' (' + featureItem.status + ')'} </h1>

            <div className = 'FeatureBody'>
                <h3> Suggested by: </h3>
                <p> {featureItem.originalRequester.fullName} </p>
                <p> {featureItem.originalRequester.username} </p>
                <p> {'Requested on - ' + date.format(new Date(featureItem.requestedOn), 'MMM DD - hh:mm A')} </p>
                <br />
                <h3>  Original Info description: </h3>
                <p> {featureItem.originalRequester.originalDescription} </p>
                <h3>  Current description: </h3>
                <p> {featureItem.description} </p>
            </div>

            {votingInfo}

            <Card className = 'FeatureFooter'>
              <CardHeader className = 'FeatureFooter' title = 'Actions' actAsExpander = {true} showExpandableButton = {true}/>
              <CardText expandable = {true}>
                {footerStructure}
              </CardText>
            </Card>

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

const DumbAdminFeatures = (props) => {

  let propName = props.propName;

  return (
    <div>

    </div>
  );
};

DumbAdminFeatures.propTypes = {
  propName:     PropTypes.type.isRequired,
};

*/

export default withRouter(DumbAdminFeatures)
