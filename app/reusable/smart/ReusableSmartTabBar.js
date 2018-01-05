import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'

export default class ReusableSmartTabBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabId: 'id'
    }

    this.handleChangeTabValue = this.handleChangeTabValue.bind(this)
  }

  handleChangeTabValue (value) {
    this.setState({tabId: value})
  }

  render () {
    //---------------------------CONDITIONS-------------------------------------


    //----------------------------RETURN----------------------------------------
    return(
      <div>
        <div>
          <Tabs value={this.state.tabId} onChange={this.handleChangeTabValue}>

            <Tab label={tabInfoArray[0].label} value={tabInfoArray[0].label}>
              {this.props.tabInfoArray[0].tabComponent}
            </Tab>

            <Tab label={this.props.tabInfoArray[1].label} value={tabInfoArray[1].label}>
              {this.props.tabInfoArray[1].tabComponent}
            </Tab>

            <Tab label={this.props.tabInfoArray[2].label} value={tabInfoArray[2].label}>
              {this.props.tabInfoArray[2].tabComponent}
            </Tab>

          </Tabs>
        </div>
        <div>
          <h1> Hello </h1>
        </div>
      </div>
    )
  }
}

/*

  <div>
    <Tabs value={this.state.tabId} onChange={this.handleChangeTabValue}>

      <Tab label={tabInfoArray[0].label} value={tabInfoArray[0].label}>
        {this.props.tabInfoArray[0].tabComponent}
      </Tab>

      <Tab label={this.props.tabInfoArray[1].label} value={tabInfoArray[1].label}>
        {this.props.tabInfoArray[1].tabComponent}
      </Tab>

      <Tab label={this.props.tabInfoArray[2].label} value={tabInfoArray[2].label}>
        {this.props.tabInfoArray[2].tabComponent}
      </Tab>

    </Tabs>
  </div>
*/
