import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

import DumbPrepareMeeting from '../../dumbComponents/TeamMeeting/DumbPrepareMeeting.js'

export default class SmartPrepareMeeting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      goals: []
    }

    this.removeGoalListItem       = this.removeGoalListItem.bind(this)
    this.createGoalList           = this.createGoalList.bind(this)
    this.changeGoalListItem       = this.changeGoalListItem.bind(this)
    this.addGoaListItem           = this.addGoaListItem.bind(this)
    this.handleChange             = this.handleChange.bind(this)
    this.nextStep                 = this.nextStep.bind(this)
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  nextStep () {
    var dataObj = this.props.getMeetingData()
    dataObj.title = this.state.title
    dataObj.goals = this.state.goals
    this.props.submitMeetingData(dataObj)
    this.props.handleIndexChange('forward')
  }

  createGoalList () {
    var listItems = this.state.goals
    var goalList = (<div>

        {listItems.map((item, index) => {
          return (
          <Paper key = {index} className = 'PrepareMeetingListItem'>
            <h2 style={{padding: '4px'}}> {index + 1}. </h2>
            <TextField
              underlineShow = {false}
              value = {listItems[index]}
              name = {JSON.stringify(index)}
              onChange = {this.changeGoalListItem}
              />
            <button type = 'button' className = 'PrepareMeetingListItemButton' onClick={() => this.removeGoalListItem({index})}> X </button>
          </Paper>
          )
        })}
        <RaisedButton
          label = 'Add a new goal'
          style={{width:'100%'}}
          onClick={() => this.addGoaListItem()}
          />
      </div>)
      return goalList
  }

  removeGoalListItem (mapObj) {
    var tempGoalList = this.state.goals
    tempGoalList.splice(mapObj.index, 1)
    this.setState({goals: tempNewGoalList})

  }

  changeGoalListItem (event) {
    var tempGoalList = this.state.goals
    tempGoalList[event.target.name] = event.target.value
    this.setState({goals: tempGoalList})
  }

  addGoaListItem () {
    var tempGoalList = this.state.goals
    tempGoalList.push('')
    this.setState({goals: tempGoalList})

    console.log(this.state.goals)
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------
    var goalList = this.createGoalList()
    //----------------------------RETURN----------------------------------------
    return(
      <DumbPrepareMeeting
        nextStep                = {this.nextStep}
        handleChange            = {this.handleChange}
        meetingTitle            = {this.state.title}
        goalList                = {goalList}
        />
    )
  }
}
