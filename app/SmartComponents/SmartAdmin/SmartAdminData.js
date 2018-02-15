import React from 'react'
import {withRouter} from 'react-router-dom'
// import PropTypes    from 'prop-types';

import DumbAdminData from '../../DumbComponents/Admin/DumbAdminData.js'

class SmartAdminData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataBucket: {
        alphaJobList: []
      }
    }

    this.createDataBucket = this.createDataBucket.bind(this)
  }

  componentDidMount () {
    this.createDataBucket()
  }


  createDataBucket () {
    var dataBucketVal = {}

    // initialize certain data points
    dataBucketVal.alphaJobList                 = []
    dataBucketVal.userCount                 = 0
    dataBucketVal.userRequestedFeatures     = 0
    dataBucketVal.userFeedbackMessages      = 0
    dataBucketVal.accumulatedTimeInApp      = 0
    dataBucketVal.accumulatedTimeInMeetings = 0
    dataBucketVal.accumulatedTimeInSTT      = 0
    dataBucketVal.weeklyActiveUsers         = 0
    dataBucketVal.monthlyActiveUsers        = 0

    //Stats on users
    this.props.adminDocs.userDocs.map((userItem, index) => {
      // skip admin accounts
      if (userItem.admin) return

      // manage the absolute data points
      dataBucketVal.userCount += 1
      dataBucketVal.accumulatedTimeInSTT += userItem.data.appUsage.totalSpeechRecognitionTime
      dataBucketVal.accumulatedTimeInApp += userItem.data.appUsage.totalTimeInApp
      dataBucketVal.accumulatedTimeInMeetings += userItem.data.appUsage.timeInMeetingsHeld + userItem.data.appUsage.timeInCustomMeetingsHeld

      dataBucketVal.userRequestedFeatures += userItem.data.userHistory.featureRequestHistory.length
      dataBucketVal.userFeedbackMessages += userItem.data.userHistory.feedbackHistory.length

      dataBucketVal.alphaJobList.push({jobPosition: userItem.jobPosition, organization: userItem.organization})

      // weekly & monthly users (user needs to log in 3 times to be qualified)
      // difference between last logged in and today (in milliseconds)
      var diff = []

      userItem.data.userHistory.loginHistory.map((loginDate) => {
        diff.push(Math.abs(new Date(loginDate) - new Date()))
      })

      var loginsThisWeek
      var loginsThisMonth
      diff.map((loginDifference) => {
        // if this login date difference is less than 7 days (604,800,000 milliseconds)
        if (loginDifference < 604800000) loginsThisWeek += 1
        // if this login date difference is less than 30 days (2,592,000,000 milliseconds)
        if (loginDifference < 2592000000) loginsThisMonth += 1
      })

      // if user has logged in 3 or more times in the last week, they are a weekly active user
      if (loginsThisWeek >= 3) dataBucketVal.weeklyActiveUsers += 1

      // if user has logged in 3 or more times in the last week, they are a monthly active user
      if (loginsThisMonth >= 3) dataBucketVal.monthlyActiveUsers += 1
    })
    //clean up data points
    //remove duplicates from alphaJobList
    dataBucketVal.alphaJobList = Array.from(new Set(dataBucketVal.alphaJobList))

    //Sorts alphabetical depending on organization


    //Meeting stats
    dataBucketVal.meetingCount                  = 0
    dataBucketVal.meetingsHeldLastMonth         = 0
    dataBucketVal.meetingsHeldLastWeek          = 0 //finish
    dataBucketVal.averageActionItemsPerMeeting  = 0
    dataBucketVal.averageDecisionsPerMeeting    = 0
    dataBucketVal.averageGeneralNotePerMeeeting = 0
    dataBucketVal.averageLengthOfMeetings       = 0



    this.props.adminDocs.meetingDocs.map((meetingItem, index) => {
      dataBucketVal.meetingCount += 1


      //Average values

      // initialze average values
      var totalActionItems = 0
      var totalGeneralNotes = 0
      var totalDecisions = 0

      if (index === 0) {

        meetingItem.notes.map((noteItem) => {
          switch (noteItem.category) {
            case 'general':
              totalGeneralNotes += 1
              break

            case 'action':
              totalActionItems += 1
              break

            case 'decision':
              totalDecisions += 1
              break
          }
        })

        dataBucketVal.averageDecisionsPerMeeting    = totalDecisions
        dataBucketVal.averageActionItemsPerMeeting  = totalActionItems
        dataBucketVal.averageGeneralNotePerMeeeting = totalGeneralNotes

      } else {

        meetingItem.notes.map((noteItem) => {
          switch (noteItem.category) {
            case 'general':
              totalGeneralNotes += 1
              break

            case 'action':
              totalActionItems += 1
              break

            case 'decision':
              totalDecisions += 1
              break
          }
        })

        dataBucketVal.averageDecisionsPerMeeting    = (dataBucketVal.averageDecisionsPerMeeting + totalDecisions)/2
        dataBucketVal.averageActionItemsPerMeeting  = (dataBucketVal.averageActionItemsPerMeeting + totalActionItems)/2
        dataBucketVal.averageGeneralNotePerMeeeting = (dataBucketVal.averageGeneralNotePerMeeeting + totalGeneralNotes)/2

      }

    })

    console.log('mapped bucket')
    console.log(dataBucketVal)

    //formatting times
    dataBucketVal.accumulatedTimeInApp = Math.floor(dataBucketVal.accumulatedTimeInApp/60000)
    dataBucketVal.accumulatedTimeInMeetings = Math.floor(dataBucketVal.accumulatedTimeInMeetings/60000)
    dataBucketVal.accumulatedTimeInSTT = Math.floor(dataBucketVal.accumulatedTimeInSTT/60000)
    dataBucketVal.averageLengthOfMeetings = Math.floor(dataBucketVal.averageLengthOfMeetings/60000)


    this.setState({dataBucket: dataBucketVal})
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    //---------------------------RETURN-----------------------------------------
    return(
      <div>
        <DumbAdminData
          dataBucket = {this.state.dataBucket}
        />
      </div>
    )
  }
}

export default withRouter(SmartAdminData)
//-------------------------------EXPECTED PROP TYPES----------------------------
// SmartAdminData.propTypes = {
//   propName: PropTypes.type,
  //Example: currentFolder: PropTypes.string.isRequired,
// };
