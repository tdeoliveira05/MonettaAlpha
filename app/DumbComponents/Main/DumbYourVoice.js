import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes    from 'prop-types'
import FontIcon from 'material-ui/FontIcon'

const DumbYourVoice = ({
  topFeatures,
  featureList,
  submitVote,
  dialogClick,
  votesLeft
}) => {

  // let propName = props.propName;



  return (
    <div className = 'YourVoiceWrapper'>
      <div className = 'YourVoiceContent'>
        <div className = 'YourVoiceHeader'>
          <h1> Vote for what you want us to build! </h1>
          <p style = {{margin: '0', padding: '0'}}> {'Weekly votes left: ' + votesLeft + ' (out of 3)'} </p>

          <button className = 'YourVoiceSuggestionButton' onClick = {() => dialogClick('suggestion')}> SUGGEST A FEATURE </button>
        </div>
        <div className = 'YourVoiceBody'>
          <h2 style = {{margin: '0px 0px 20px 0px'}}> Top 3 suggested features: </h2>

          <div className = 'YourVoiceFeatureList'>
          {topFeatures.map((item, index) => {
            var thumbDownStyle = {}
            var thumbUpStyle = {}

            if (item.voted === -1) {
              thumbDownStyle = {backgroundColor: 'rgb(204,0,51)'}
            } else if (item.voted === 1) {
              thumbUpStyle = {backgroundColor: 'rgb(0,100,0)'}
            }

            return (
              <div className = 'YourVoiceFeatureCard' key = {index}>
                <div className = 'YourVoiceVote'>
                  <button className = 'thumbsDown' onClick = {() => submitVote(index, item._id, -1)} style = {thumbDownStyle} >
                    <FontIcon className = 'material-icons' style = {{color: 'white'}}>thumb_down</FontIcon>
                  </button>
                </div>
                <div className = 'YourVoiceFeatureText'>
                  <h3> {item.title} </h3>
                  <button onClick = {() => dialogClick('comment', index)}> COMMENT </button>
                </div>
                <div className = 'YourVoiceVote'>
                  <button className = 'thumbsUp' onClick = {() => submitVote(index, item._id, 1)} style = {thumbUpStyle}>
                    <FontIcon className = 'material-icons' style = {{color: 'white'}}>thumb_up</FontIcon>
                  </button>
                </div>
              </div>
            )
          })}
          </div>

          <div className = 'Divider' style = {{margin: '20px 0px 20px 0px'}}></div>

          <div className = 'YourVoiceFeatureList'>
          {featureList.map((item, index) => {
            var thumbDownStyle = {}
            var thumbUpStyle = {}

            if (item.voted === -1) {
              thumbDownStyle = {backgroundColor: 'rgb(204,0,51)'}
            } else if (item.voted === 1) {
              thumbUpStyle = {backgroundColor: 'rgb(0,100,0)'}
            }

            return (
              <div className = 'YourVoiceFeatureCard' key = {index}>
                <div className = 'YourVoiceVote'>
                  <button className = 'thumbsDown' onClick = {() => submitVote(index + 3, item._id, -1)} style = {thumbDownStyle}>
                    <FontIcon className = 'material-icons' style = {{color: 'white'}}>thumb_down</FontIcon>
                  </button>
                </div>
                <div className = 'YourVoiceFeatureText'>
                  <h3> {item.title} </h3>
                  <button onClick = {() => dialogClick('comment', index + 3)}> COMMENT </button>
                </div>
                <div className = 'YourVoiceVote'>
                  <button className = 'thumbsUp' onClick = {() => submitVote(index + 3, item._id, 1)} style = {thumbUpStyle}>
                    <FontIcon className = 'material-icons' style = {{color: 'white'}}>thumb_up</FontIcon>
                  </button>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

DumbYourVoice.propTypes = {
  // propName:     PropTypes.type.isRequired,
};

export default withRouter(DumbYourVoice)

/*
console.log(commentItem)
var monthIndex = commentItem.timestamp.getMonth()
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var month = months[monthIndex]

var time = commentItem.timestamp.getHours() + ':' + commentItem.timestamp.getMinutes()
var day = commentItem.timestamp.getDate

var thisDate = time + ' ' + month + ' ' + day
*/
