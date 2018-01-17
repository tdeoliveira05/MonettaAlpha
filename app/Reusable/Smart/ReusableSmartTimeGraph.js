import React from 'react'
import PropTypes from 'prop-types'
import {Line as LineChart} from 'react-chartjs'

export default class ReusableSmartTimeGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.createChartData = this.createChartData.bind(this)
    this.createChartOptions = this.createChartOptions.bind(this)
  }

  createChartData () {
    /*
    var chartData = []
    var timeData = this.props.timeData
    var numberOfSets = timeData.length

    for (var i = 0; i > numberOfSets; i++) {
      chartData[i] = {
        label: timeData[i].label,
        data: timeData[i].dataPoints
      }

    }


    return chartData
    */
  }

  createChartOptions () {

  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    /*
    var chartData = this.createChartData()
    var chartOptions = this.createChartOptions()
    */

    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <LineChart data = {chartData} options = {chartOptions} />
      </div>
    )
  }
}

ReusableSmartTimeGraph.propTypes = {
  timeData: PropTypes.object,
  timeOptions: PropTypes.object
}

/*
Expected prop inputs:

x-axis -> time
y-axis -> quantity

timeData = [
  {
  label: 'labelName',
  dataPoints: [{...}, {...}, ...],
  color: 'random' || '...'
  },
  {
  label: 'labelName',
  dataPoints: [{...}, {...}, ...],
  color: 'random' || '...'
  },
  {
  label: 'labelName',
  dataPoints: [{...}, {...}, ...],
  color: 'random' || '...'
  },
  ...
]


Expected prop output into <LineChart />:

chartData = {
  datasets: [
    {
      label: 'Action Items',
      data: [
              {point-x1, point-y1},
              {point-x2, point-y2},
              {point-x3, point-y3},
              {point-x4, point-y4},
              {point-x5, point-y5}
            ]
    },
    {
      label: 'General Notes',
      data: [
              {point-x1, point-y1},
              {point-x2, point-y2},
              {point-x3, point-y3},
              {point-x4, point-y4},
              {point-x5, point-y5}
            ]
    },
    {
      label: 'Team Decisions',
      data: [
              {point-x1, point-y1},
              {point-x2, point-y2},
              {point-x3, point-y3},
              {point-x4, point-y4},
              {point-x5, point-y5}
            ]
    }
  ]
}


chartOptions = {
  scales:
  {
    xAxes:
    [{

      type: 'time',

      time: {
        format: 'HH:mm',
        unit: 'hour',
        unitStepSize: 2,
        displayFormats: {
          'minute': 'HH:mm',
          'hour': 'HH:mm'
        },
        tooltipFormat: 'HH:mm'
      },

      gridLines: {
        display: false
      }

    }]
  }
}
*/
