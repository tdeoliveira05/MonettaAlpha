import React from 'react'
import {withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import date from 'date-and-time'


const DumbDashboard = ({
  history,
  templateList,
  scheduledList,
  dataList
}) => (
  <div className = 'DashboardWrapper'>
    <div className = 'DashboardContent'>
      <div className = 'DashboardContentLeft'>
        <h1> Monetta Dashboard </h1>
        <p> {date.format(new Date(), 'ddd, MMM DD YYYY')} </p>
        <div className = 'DashboardProductivityData'>
          {dataList.map((item, index) => {
            return (
              <div className = 'DashboardDataBucket'>
                <h3> {item.header} </h3>
                <p> {item.label} </p>
              </div>
            )
          })}
        </div>
        <div className = 'DashboardScheduledMeetings'>
          <div className = 'DashboardScheduledHeader'>
            <h3> Scheduled </h3>
            <button> + </button>
          </div>
          {scheduledList.map((item, index) => {
            return (
              <div className = 'DashboardScheduledMeetingCards' key = {index}>
                <div className = 'ScheduledMeetingCardInfo'>
                  <h3> {item.date} </h3>
                  <h3> - </h3>
                  <h3> {item.name}</h3>
                </div>
                <div className = 'ScheduledMeetingCardButton'>
                  <button> START </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className = 'DashboardContentRight'>
        <div className = 'DashboardHostButtonDiv'>
          <button> Host a meeting </button>
        </div>
        <div className = 'DashboardCustomTemplates'>
          <h3> Custom Meeting Templates </h3>
          {templateList.map((item, index) => {
            return (
              <div className = 'DashboardTemplateCard' key = {index}>
                <button onClick = {() => history.push('/meeting/custom-' + item.customId)}>
                  {item.name}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>
)

export default withRouter(DumbDashboard)

/*
<div className = 'DashboardContent'>
  <div className = 'DashboardHeader'>

    <h1> Monetta Dashboard </h1>

    <div className = 'DashboardHeaderOptions'>
      <div>
        <Paper className = 'DashboardHeaderPaper'>
          <button> Schedule a meeting </button>
        </Paper>
      </div>

      <div>
        <Paper className = 'DashboardHeaderPaper'>
          <button> Host a meeting </button>
        </Paper>
      </div>
    </div>
  </div>

  <div className = 'DashboardBody'>

  </div>
</div>

.DashboardWrapper
 width: 100%
 height: 100%
 display: flex
 flex-direction: column
 justify-content: center
 align-items: center
 .DashboardContent
  display: flex
  flex-direction: column
  width: 80%
  height: 100%
  min-width: 320px
  .DashboardBody
    display: flex
    flex-direction: column
  .DashboardHeader
   display: flex
   flex-direction: column
   align-items: center
   text-align: center
   margin-top: 30px
   .DashboardHeaderOptions
     display: flex
     margin-top: 20px
     align-items: center
     width: 260px
     justify-content: space-between
     .DashboardHeaderPaper
       display: flex
       flex-direction: column
       align-items: center
       justify-content: center
       height: 100px
       width: 100px
       margin: 0
       padding: 0
       button
        width: 100%
        height: 100%
*/
